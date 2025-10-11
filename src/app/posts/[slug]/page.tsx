import { posts } from '#site/content'
import dayjs from 'dayjs'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MarkdownContent } from '@/components/MarkdownContent'
import IconBadge from '@/components/ui/IconBadge'
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

export async function generateMetadata({ params }: PostPageProps) {
	const { slug } = await params
	const post = posts.find(p => p.slug === slug)

	if (!post) {
		return {}
	}

	return {
		title: post.title,
		description: post.description,
	}
}

export default async function PostPage({ params }: PostPageProps) {
	const { slug } = await params
	const post = posts.find(p => p.slug === slug)

	if (!post) {
		notFound()
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

			</article>
		</>
	)
}
