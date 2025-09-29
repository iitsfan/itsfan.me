import { posts } from '#site/content'
import dayjs from 'dayjs'
import Link from 'next/link'
import { notFound } from 'next/navigation'
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
			<Link href="/posts" className="mb-4 flex cursor-pointer items-center gap-2 font-semibold">
				<i className="i-mingcute-back-fill" />
				Back
			</Link>
			<article className="prose prose-lg dark:prose-invert max-w-none">
				<section className="mb-10">
					<h1 className="mb-2 text-3xl font-extrabold text-(--text-primary)">
						{post.title}
					</h1>
					<time className="mb-6 flex items-center space-x-4 text-lg text-(--text-secondary)">
						{dayjs(post.date).format('YYYY-MM-DD')}
						{' '}
					</time>
				</section>

				<div
					className="markdown"
					dangerouslySetInnerHTML={{ __html: post.content }}
				/>

			</article>
		</>
	)
}
