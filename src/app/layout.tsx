import type { Metadata } from 'next'
import { JetBrains_Mono, Noto_Sans, Noto_Sans_SC } from 'next/font/google'
import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'
import Providers from './providers'

const cascadiaCode = JetBrains_Mono({
	variable: '--font-mono',
	subsets: ['latin'],
})

const notoSans = Noto_Sans({
	variable: '--font-sans',
	subsets: ['latin'],
	weight: ['100', '300', '400', '500', '600', '700', '800', '900'],
})

const notoSansSC = Noto_Sans_SC({
	variable: '--font-sans-sc',
	subsets: ['latin'],
	weight: ['100', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: siteConfig.title,
		template: `%s - ${siteConfig.title}`,
	},
	description: siteConfig.description,
	applicationName: siteConfig.title,
	keywords: siteConfig.keywords,
	authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
	creator: siteConfig.author.name,
	publisher: siteConfig.author.name,
	category: 'technology',
	alternates: {
		canonical: '/',
		types: {
			'application/rss+xml': `${siteConfig.url}/feed.xml`,
		},
	},
	openGraph: {
		title: siteConfig.title,
		description: siteConfig.description,
		url: siteConfig.url,
		siteName: siteConfig.title,
		locale: siteConfig.locale,
		type: 'website',
		images: [
			{
				url: siteConfig.ogImage.url,
				width: siteConfig.ogImage.width,
				height: siteConfig.ogImage.height,
				alt: siteConfig.title,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.title,
		description: siteConfig.description,
		images: [siteConfig.ogImage.url],
	},
	icons: {
		icon: [
			{ url: '/avatar.jpeg', sizes: '460x460', type: 'image/jpeg' },
		],
		apple: [
			{ url: '/avatar.jpeg', sizes: '180x180', type: 'image/jpeg' },
		],
		shortcut: '/avatar.jpeg',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="zh-CN" suppressHydrationWarning data-scroll-behavior="smooth">
			<body className={cn(
				notoSans.variable,
				notoSansSC.variable,
				cascadiaCode.variable,
				'flex min-h-screen w-screen flex-col antialiased',
			)}
			>
				<Providers>
					<Header />
					<main className="mt-14 flex w-full flex-1 flex-col items-center px-4 py-8 sm:mt-24 sm:p-6">
						<div className="mx-auto w-full max-w-xl">
							{children}
						</div>
					</main>
					<Footer />
				</Providers>
			</body>
		</html>
	)
}
