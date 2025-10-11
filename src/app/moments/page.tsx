import type { Metadata } from 'next'
import { Suspense } from 'react'
import PageTitle from '@/components/layouts/pageTitle'
import MomentsList from '@/components/momentsList'
import { MomentService } from '@/lib/moments.service'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
	title: 'Moments',
	description: 'Sharing random thoughts and everyday ramblings.',
	alternates: {
		canonical: '/moments',
	},
	openGraph: {
		title: 'Moments',
		description: 'Sharing random thoughts and everyday ramblings.',
		url: `${siteConfig.url}/moments`,
		type: 'website',
		images: [
			{
				url: siteConfig.ogImage.url,
				width: siteConfig.ogImage.width,
				height: siteConfig.ogImage.height,
				alt: 'Moments',
			},
		],
	},
	twitter: {
		title: 'Moments',
		description: 'Sharing random thoughts and everyday ramblings.',
		images: [siteConfig.ogImage.url],
	},
}

export default function Moments() {
	return (
		<>
			<PageTitle title="📸 Moments" />
			<Suspense fallback={<MomentsLoading />}>
				<MomentsListWrapper />
			</Suspense>
		</>
	)
}

async function MomentsListWrapper() {
	const { data: moments, total } = await MomentService.findAll({ limit: 5, offset: 0 })
	return <MomentsList initialMoments={moments} initialTotal={total} />
}

function MomentsLoading() {
	return (
		<div className="mt-8 text-sm text-(--text-tertiary)">
			Loading...
		</div>
	)
}
