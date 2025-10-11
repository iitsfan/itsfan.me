import { JetBrains_Mono, Noto_Sans, Noto_Sans_SC } from 'next/font/google'
import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header'
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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
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
