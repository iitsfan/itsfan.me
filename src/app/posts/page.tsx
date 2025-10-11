import type { Metadata } from 'next'
import { posts } from '#site/content'
import dayjs from 'dayjs'
import Link from 'next/link'
import React from 'react'
import PageTitle from '@/components/layouts/pageTitle'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
	title: 'Posts',
	description: 'A place to share and take notes, hoping to create value someday.',
	alternates: {
		canonical: '/posts',
	},
	openGraph: {
		title: 'Posts',
		description: 'A place to share and take notes, hoping to create value someday.',
		url: `${siteConfig.url}/posts`,
		type: 'website',
		images: [
			{
				url: siteConfig.ogImage.url,
				width: siteConfig.ogImage.width,
				height: siteConfig.ogImage.height,
				alt: 'Posts',
			},
		],
	},
	twitter: {
		title: 'FAN',
		description: 'A place to share and take notes, hoping to create value someday.',
		images: [siteConfig.ogImage.url],
	},
}

export default function Posts() {
	const sortedPosts = posts.sort((a, b) =>
		new Date(b.date).getTime() - new Date(a.date).getTime(),
	)

	const groupedPosts = sortedPosts.reduce((groups, post) => {
		const year = new Date(post.date).getFullYear().toString()
		if (!groups[year]) {
			groups[year] = []
		}
		groups[year].push(post)
		return groups
	}, {} as Record<string, typeof posts>)

	const years = Object.keys(groupedPosts).sort((a, b) => Number.parseInt(b) - Number.parseInt(a))

	return (
		<>
			<PageTitle title="📋 Posts" />

			<div className="space-y-8">
				{years.map(year => (
					<div key={year}>
						<div className="pointer-events-none relative h-16 select-none">
							<span
								className="absolute top-0 left-0 text-9xl leading-none font-black text-(--accent) italic opacity-[0.06] select-none"
							>
								{year}
							</span>
						</div>

						<div className="relative -mt-4 space-y-3">
							{groupedPosts[year].map(post => (
								<div key={post.slug} className="flex items-center justify-between text-base text-(--text-secondary)">
									<Link
										href={`/posts/${post.slug}`}
										className="cursor-pointer font-semibold text-(--text-primary) transition-colors duration-300 hover:text-(--accent-strong)"
									>
										{post.title}
									</Link>
									<time className="ml-4 shrink-0 text-(--text-tertiary)">
										{ dayjs(String(post.date)).format('YYYY/MM/DD') }
									</time>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</>
	)
}
