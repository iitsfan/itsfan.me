import { Source_Sans_3 } from 'next/font/google'
import Footer from '@/components/Layous/Footer'
import Header from '@/components/Layous/Header'
import Providers from './providers'

const sourceSans = Source_Sans_3({
	subsets: ['latin'],
	display: 'swap',
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${sourceSans.className} flex h-screen w-screen flex-col scroll-smooth antialiased`}>
				<Providers>
					<Header />
					<main className="mt-24 flex w-full flex-1 flex-col items-center px-4 py-8 sm:p-6">
						{children}
					</main>
					<Footer />
				</Providers>
			</body>
		</html>
	)
}
