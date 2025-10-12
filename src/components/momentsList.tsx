'use client'

import type { Moment, MomentListResponse } from '@/types/moment'
import { useCallback, useEffect, useRef, useState } from 'react'
import MomentCard from '@/components/momentCard'
import { cn } from '@/lib/utils'

const LIMIT = 5
const MAX_RETRY = 3

export default function MomentsList() {
	const [moments, setMoments] = useState<Moment[]>([])
	const [offset, setOffset] = useState(0)
	const [hasMore, setHasMore] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [retryCount, setRetryCount] = useState(0)
	const observerRef = useRef<IntersectionObserver | null>(null)
	const loadMoreRef = useRef<HTMLDivElement>(null)
	const initializedRef = useRef(false)

	const loadMore = useCallback(async (options?: { isRetry?: boolean }) => {
		const isRetry = options?.isRetry ?? false

		if (isLoading || !hasMore)
			return

		if (error && !isRetry)
			return

		if (retryCount >= MAX_RETRY && !isRetry)
			return

		if (isRetry)
			setError(null)

		setIsLoading(true)

		try {
			const response = await fetch(`/api/moments?limit=${LIMIT}&offset=${offset}`)
			if (!response.ok) {
				if (response.status === 401 || response.status === 403) {
					setHasMore(false)
					throw new Error('unauthorized')
				}

				throw new Error('request-failed')
			}

			const data: MomentListResponse = await response.json()

			let nextLength = 0
			setMoments((prev) => {
				const next = [...prev, ...data.data]
				nextLength = next.length
				return next
			})

			setOffset(prev => prev + data.data.length)
			setRetryCount(0)
			setError(null)

			const reachedEnd = data.data.length === 0 || nextLength >= data.total
			if (reachedEnd) {
				setHasMore(false)
				observerRef.current?.disconnect()
				observerRef.current = null
				return
			}

			setHasMore(true)
		}
		catch (error) {
			console.error('Failed to load more moments:', error)

			setRetryCount(prev => Math.min(prev + 1, MAX_RETRY))

			if (error instanceof Error) {
				if (error.message === 'unauthorized') {
					setError('Unauthorized loading moments :(')
					return
				}

				if (error.message === 'request-failed') {
					setError('Loading error :(')
					return
				}
			}

			setError('Loading error,')
		}
		finally {
			setIsLoading(false)
		}
	}, [error, hasMore, isLoading, offset, retryCount])

	useEffect(() => {
		if (initializedRef.current)
			return

		initializedRef.current = true
		loadMore()
	}, [loadMore])

	useEffect(() => {
		const target = loadMoreRef.current

		if (!hasMore || error || !target) {
			observerRef.current?.disconnect()
			observerRef.current = null
			return
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting)
					loadMore()
			},
			{ rootMargin: '100px' },
		)

		observerRef.current?.disconnect()
		observerRef.current = observer
		observer.observe(target)

		return () => {
			observer.disconnect()
		}
	}, [error, hasMore, loadMore])

	const handleRetry = useCallback(() => {
		loadMore({ isRetry: true })
	}, [loadMore])

	return (
		<>
			<div className="mt-8 space-y-6">
				{moments.map(moment => (
					<MomentCard key={moment.id} item={moment} />
				))}
			</div>

			{error && (
				<div
					className="mt-4 flex flex-row items-center justify-center gap-x-1 text-sm text-(--text-secondary)"
					role="alert"
				>
					<span>{error}</span>
					{hasMore && (
						<button
							type="button"
							className="cursor-pointer text-sm text-(--accent) no-underline hover:text-(--accent-strong)"
							onClick={handleRetry}
							disabled={isLoading}
						>
							reload moments.
						</button>
					)}
				</div>
			)}

			{hasMore && (
				<div
					ref={loadMoreRef}
					className={cn(
						'mt-6 flex items-center justify-center text-sm',
						'text-(--text-tertiary)',
						error ? 'hidden' : undefined,
					)}
					aria-live="polite"
				>
					{isLoading && <span>Loading...</span>}
				</div>
			)}

			{!hasMore && moments.length > 0 && !error && (
				<div className="mt-2 flex items-center justify-center text-(--text-tertiary)">
					—
				</div>
			)}
		</>
	)
}
