'use client'

import type { Moment } from '@/types/moment'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import mediumZoom from 'medium-zoom'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import IconBadge from '@/components/ui/IconBadge'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)

interface MomentCardProps {
	item: Moment
}

export default function MomentCard({ item }: MomentCardProps) {
	const imagesContainerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!imagesContainerRef.current)
			return

		const images = imagesContainerRef.current.querySelectorAll('img')
		if (images.length === 0)
			return

		const zoom = mediumZoom(images)

		return () => {
			zoom.detach()
		}
	}, [item.images])

	return (
		<div className="rounded-xl border border-(--border-subtle) bg-(--surface-card) p-4 shadow-sm transition-colors duration-300">
			<div className="flex items-center justify-between">
				<h2 className="font-bold text-(--text-primary)">
					@FAN
				</h2>
				<time className="flex items-center text-sm text-(--text-tertiary)">
					{dayjs(item.createdAt).fromNow()}
				</time>
			</div>
			<div className="my-3 h-px w-full bg-(--border-subtle) opacity-60" aria-hidden="true" />

			<div className="pb-4">
				<p className="overflow-hidden break-words whitespace-pre-wrap text-(--text-secondary)">
					{item.content}
				</p>

				{item.images && item.images.length > 0 && (
					<div className="mt-3 overflow-x-auto">
						<div ref={imagesContainerRef} className="flex gap-2">
							{item.images.map(image => (
								<Image
									key={image}
									className="rounded-lg"
									src={image}
									width={256}
									height={256}
									alt="Moment image"
								/>
							))}
						</div>
					</div>
				)}
			</div>
			<div className="mt-2 flex flex-wrap items-center gap-3">
				{item.tags && item.tags.length > 0 && item.tags.map(tag => (
					<IconBadge
						key={item.id + tag}
						text={`#${tag}`}
						variant="tag"
					/>
				))}
			</div>
		</div>
	)
}
