import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
