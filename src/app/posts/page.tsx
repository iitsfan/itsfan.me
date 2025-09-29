import { posts } from '#site/content'
import dayjs from 'dayjs'
import Link from 'next/link'
import React from 'react'
import PageTitle from '@/components/layouts/pageTitle'

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
								className="absolute top-0 left-0 text-9xl leading-none font-black text-gray-300 italic opacity-30 select-none dark:text-gray-800"
							>
								{year}
							</span>
						</div>

						<div className="relative -mt-4 space-y-3">
							{groupedPosts[year].map(post => (
								<div key={post.slug} className="flex items-center justify-between text-base text-(--text-secondary)/90">
									<Link
										href={`/posts/${post.slug}`}
										className="cursor-pointer font-semibold transition-colors duration-300 hover:text-(--text-primary)"
									>
										{post.title}
									</Link>
									<time className="ml-4 shrink-0">
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
