import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

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

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
