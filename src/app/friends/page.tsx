import type { Metadata } from 'next'
import { friends } from '#site/content'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import PageTitle from '@/components/layouts/pageTitle'
import { siteConfig } from '@/lib/site'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('friends.meta')

	return {
		title: t('title'),
		description: t('description'),
		alternates: {
			canonical: '/friends',
		},
		openGraph: {
			title: `${t('title')} - FAN`,
			description: t('description'),
			url: `${siteConfig.url}/friends`,
			type: 'website',
		},
		twitter: {
			title: `${t('title')} - FAN`,
			description: t('description'),
		},
	}
}

export default function Friends() {
	const t = useTranslations('friends')

	const friendsData = friends[0]

	return (
		<>
			<PageTitle title={t('title')} />

			<div className="mt-8 mb-6 grid-flow-row grid-cols-2 gap-x-7 gap-y-5 sm:grid">
				{friendsData.links.map(link => (
					<a
						key={link.title}
						className="mt-4 flex items-center gap-3 rounded-xl border border-(--border-subtle) bg-(--surface-card) px-4 py-3 shadow-sm transition-all duration-300 will-change-transform hover:-translate-y-1 hover:border-(--accent-strong)/60 hover:bg-(--surface-muted) hover:shadow-md focus-visible:ring-2 focus-visible:ring-(--focus-ring) focus-visible:ring-offset-2 focus-visible:ring-offset-(--bg-primary) focus-visible:outline-none sm:mt-0"
						href={link.website || '#'}
						target={link.website ? '_blank' : undefined}
						rel={link.website ? 'noopener noreferrer' : undefined}
					>
						<div>
							<Image
								className="rounded-md"
								src={link.image}
								alt={link.title}
								width={56}
								height={56}
								loading="lazy"
							/>
						</div>
						<div className="flex flex-1 flex-col gap-1">
							<h2 className="font-medium text-(--text-primary)">
								{link.title}
							</h2>
							<p className="text-xs text-(--text-secondary) sm:text-sm">
								{link.description}
							</p>
						</div>
					</a>
				))}
			</div>
		</>
	)
}
