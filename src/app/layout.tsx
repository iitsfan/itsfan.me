import { ThemeProvider } from 'next-themes'
import '@/styles/globals.css'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="antialiased">
				<ThemeProvider enableSystem={false} defaultTheme="dark">
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
