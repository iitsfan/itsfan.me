'use client'

import { useImageZoom } from '@/hooks/useImageZoom'

interface MarkdownContentProps {
	content: string
	className?: string
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
	useImageZoom()

	return (
		<div
			className={className}
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	)
}
