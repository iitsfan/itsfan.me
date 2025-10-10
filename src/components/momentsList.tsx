'use client'

import type { Moment } from '@/types/moment'
import { useCallback, useEffect, useRef, useState } from 'react'
import MomentCard from '@/components/momentCard'
import { cn } from '@/lib/utils'

interface MomentsListProps {
	initialMoments: Moment[]
	initialTotal: number
}

const LIMIT = 5

export default function MomentsList({ initialMoments, initialTotal }: MomentsListProps) {
	const [moments, setMoments] = useState<Moment[]>(initialMoments)
	const [offset, setOffset] = useState(LIMIT)
	const [hasMore, setHasMore] = useState(initialMoments.length < initialTotal)
	const [isLoading, setIsLoading] = useState(false)
	const observerRef = useRef<IntersectionObserver | null>(null)
	const loadMoreRef = useRef<HTMLDivElement>(null)

	const loadMore = useCallback(async () => {
		if (isLoading || !hasMore)
			return

		setIsLoading(true)

		try {
			const response = await fetch(`/api/moments?limit=${LIMIT}&offset=${offset}`)
			if (!response.ok)
				throw new Error('Failed to fetch moments')

			const data = await response.json()

			let nextLength = 0
			setMoments((prev) => {
				const next = [...prev, ...data.data]
				nextLength = next.length
				return next
			})

			setOffset(prev => prev + LIMIT)
			setHasMore(data.data.length === LIMIT && nextLength < data.total)
		}
		catch (error) {
			console.error('Failed to load more moments:', error)
		}
		finally {
			setIsLoading(false)
		}
	}, [hasMore, isLoading, offset])

	useEffect(() => {
		if (!hasMore)
			return

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting)
					loadMore()
			},
			{ rootMargin: '100px' },
		)

		observerRef.current = observer
		const target = loadMoreRef.current
		if (target)
			observer.observe(target)

		return () => {
			observer.disconnect()
		}
	}, [hasMore, loadMore])

	return (
		<>
			<div className="mt-8 space-y-6">
				{moments.map(moment => (
					<MomentCard key={moment.id} item={moment} />
				))}
			</div>

			{hasMore && (
				<div
					ref={loadMoreRef}
					className={cn(
						'mt-6 flex items-center justify-center text-sm',
						'text-(--text-tertiary)',
					)}
					aria-live="polite"
				>
					{isLoading && <span>Loading...</span>}
				</div>
			)}

			{!hasMore && moments.length > 0 && (
				<div className="mt-2 flex items-center justify-center text-(--text-tertiary)">
					—
				</div>
			)}
		</>
	)
}
