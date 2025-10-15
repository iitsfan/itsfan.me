import type { Metadata } from 'next'
import { posts } from '#site/content'
import dayjs from 'dayjs'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MarkdownContent } from '@/components/MarkdownContent'
import IconBadge from '@/components/ui/IconBadge'
import { siteConfig } from '@/lib/site'

interface PostPageProps {
	params: Promise<{
		slug: string
	}>
}

export async function generateStaticParams() {
	return posts.map(post => ({
		slug: post.slug,
	}))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
	const { slug } = await params
	const post = posts.find(p => p.slug === slug)

	if (!post) {
		return {
			title: 'Not found',
			description: siteConfig.description,
		}
	}

	const description = post.description ?? siteConfig.description
	const url = `${siteConfig.url}/posts/${post.slug}`
	const publishedTime = new Date(post.date).toISOString()

	return {
		title: post.title,
		description,
		keywords: post.category,
		alternates: {
			canonical: `/posts/${post.slug}`,
		},
		openGraph: {
			title: post.title,
			description,
			url,
			siteName: siteConfig.title,
			locale: siteConfig.locale,
			type: 'article',
			publishedTime,
			modifiedTime: publishedTime,
			tags: post.category,
			images: [
				{
					url: siteConfig.ogImage.url,
					width: siteConfig.ogImage.width,
					height: siteConfig.ogImage.height,
					alt: post.title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: post.title,
			description,
			images: [siteConfig.ogImage.url],
		},
	}
}

export default async function PostPage({ params }: PostPageProps) {
	const { slug } = await params
	const post = posts.find(p => p.slug === slug)

	if (!post) {
		notFound()
	}

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		'headline': post.title,
		'description': post.description ?? siteConfig.description,
		'datePublished': new Date(post.date).toISOString(),
		'dateModified': new Date(post.date).toISOString(),
		'url': `${siteConfig.url}/posts/${post.slug}`,
		'mainEntityOfPage': {
			'@type': 'WebPage',
			'@id': `${siteConfig.url}/posts/${post.slug}`,
		},
		'image': siteConfig.ogImage.url,
		'author': {
			'@type': 'Person',
			'name': siteConfig.author.name,
			'url': siteConfig.author.url,
		},
		'publisher': {
			'@type': 'Person',
			'name': siteConfig.author.name,
			'url': siteConfig.author.url,
		},
		'articleSection': post.category,
		'keywords': (post.tags ?? []).join(', '),
	}

	return (
		<>
			<Link href="/posts" className="mb-4 flex cursor-pointer items-center gap-2 font-semibold text-(--text-secondary) transition-colors duration-200 hover:text-(--text-primary)">
				<i className="i-mingcute-back-fill" />
				Back
			</Link>
			<article className="prose prose-lg dark:prose-invert max-w-none">
				<section className="mb-10 space-y-3">
					<h1 className="text-3xl font-extrabold text-(--text-primary)">
						{post.title}
					</h1>
					<div className="flex w-full items-center justify-start space-x-2">
						<time className="text-lg font-medium text-(--text-secondary)">
							{dayjs(post.date).format('YYYY/MM/DD')}
						</time>
						<span className="text-2xl text-(--text-tertiary)">·</span>
						<div className="flex flex-wrap items-center">
							<IconBadge
								key={post.category}
								text={`#${post.category}`}
								variant="category"
							/>
						</div>

					</div>

				</section>

				<MarkdownContent content={post.content} className="markdown" />

				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>

			</article>
		</>
	)
}
