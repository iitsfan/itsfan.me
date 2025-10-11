import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: '/rss',
				destination: '/feed.xml',
			},
			{
				source: '/rss.xml',
				destination: '/feed.xml',
			},
			{
				source: '/feed',
				destination: '/feed.xml',
			},
		]
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 's2.loli.net',
			},
			{
				protocol: 'https',
				hostname: 'imgs.itsfan.me',
			},
		],
	},
}

export default nextConfig
