'use client'

import { ProgressProvider } from '@bprogress/next/app'
import { ReactLenis } from 'lenis/react'
import { ThemeProvider } from 'next-themes'
import '@/styles/globals.scss'

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider
			enableSystem={false}
			defaultTheme="dark"
			disableTransitionOnChange
		>
			<ProgressProvider
				options={{ showSpinner: false }}
				disableStyle
				shallowRouting
			>
				<ReactLenis root />
				{children}
			</ProgressProvider>
		</ThemeProvider>
	)
}

export default Providers
