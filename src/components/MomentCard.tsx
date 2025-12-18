'use client'

import type { Moment } from '@/types/moment'
import { useFormatter, useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { GalleryImage } from '@/components/GalleryImage'
import IconBadge from '@/components/ui/IconBadge'

interface MomentCardProps {
	item: Moment
}

export default function MomentCard({ item }: MomentCardProps) {
	const t = useTranslations('moments.list')
	const formatter = useFormatter()
	const relativeTimeLabel = useMemo(() => {
		return formatter.relativeTime(new Date(item.createdAt), new Date())
	}, [formatter, item.createdAt])

	return (
		<div className="rounded-xl border border-(--border-subtle) bg-(--surface-card) p-4 shadow-sm transition-colors duration-300">
			<div className="flex items-center justify-between">
				<h2 className="font-bold text-(--text-primary)">
					@FAN
				</h2>
				<time className="flex items-center text-sm text-(--text-tertiary)">
					{relativeTimeLabel}
				</time>
			</div>
			<div className="my-3 h-px w-full bg-(--border-subtle) opacity-60" aria-hidden="true" />

			<div className="pb-4">
				<p className="overflow-hidden wrap-break-word whitespace-pre-wrap text-(--text-secondary)">
					{item.content}
				</p>

				{item.images && item.images.length > 0 && (
					<GalleryImage
						images={item.images}
						alt={t('image alt')}
					/>
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
