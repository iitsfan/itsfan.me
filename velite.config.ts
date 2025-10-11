import {
	transformerMetaHighlight,
	transformerNotationDiff,
	transformerNotationFocus,
	transformerNotationHighlight,
} from '@shikijs/transformers'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { defineConfig, s } from 'velite'
import { transformerCopyButton } from '@/lib/transformerCopyButton'

export default defineConfig({
	root: 'content',
	output: {
		data: '.velite',
		assets: 'public/static',
		base: '/static/',
		name: '[name]-[hash:6].[ext]',
		clean: true,
	},
	collections: {
		posts: {
			name: 'posts',
			pattern: 'posts/**/*.md',
			schema: s
				.object({
					title: s.string().max(50),
					description: s.string().max(100).optional(),
					date: s.isodate(),
					category: s.string().max(10),
					tags: s.array(s.string()).default([]),
					slug: s.path().transform(path => path.replace('posts/', '')),
					draft: s.boolean().default(false),
					content: s.markdown(),
				})
				.transform(data => ({ ...data, permalink: `/${data.slug}` })),
		},
		friends: {
			name: 'friends',
			pattern: 'friends/index.md',
			schema: s
				.object({
					title: s.string(),
					date: s.isodate(),
					links: s.array(
						s.object({
							title: s.string(),
							description: s.string(),
							website: s.string().optional(),
							image: s.string(),
						}),
					),
				}),
		},
	},
	markdown: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			[rehypeAutolinkHeadings, {
				properties: { className: ['anchor'] },
				behavior: 'wrap',
			}],
			[
				rehypePrettyCode,
				{
					theme: {
						dark: 'one-dark-pro',
						light: 'one-light',
					},
					keepBackground: false,
					transformers: [
						transformerNotationDiff(),
						transformerNotationHighlight(),
						transformerNotationFocus(),
						transformerMetaHighlight(),
						transformerCopyButton(),
					],
				},
			],
		],
	},
})
