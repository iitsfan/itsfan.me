import mediumZoom from 'medium-zoom'
import { useEffect } from 'react'

interface UseImageZoomOptions {
	selector?: string
}

export function useImageZoom({
	selector = '.markdown img',
}: UseImageZoomOptions = {}) {
	useEffect(() => {
		if (typeof window === 'undefined') return

		const images = document.querySelectorAll(selector) as NodeListOf<HTMLImageElement>

		if (images.length === 0) return

		const zoom = mediumZoom(images)

		return () => {
			zoom.detach()
		}
	}, [selector])
}
