'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Footer() {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return (
			<footer className="mb-2 flex w-full items-center justify-center px-4 sm:px-0">
				<div className="flex max-w-xl flex-1 items-center gap-x-2">
					<p className="block font-bold">
						© 2025 – FAN
					</p>
				</div>
			</footer>
		)
	}

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	return (
		<footer className="mb-2 flex w-full items-center justify-center px-4 sm:px-0">
			<div className="flex max-w-xl flex-1 items-center gap-x-3">
				<p className="block font-bold text-(--text-primary)">
					© 2025 – FAN
				</p>
				<button
					onClick={toggleTheme}
					className="flex cursor-pointer items-center justify-center rounded-md bg-transparent p-1 text-(--text-secondary) transition-colors duration-300 hover:bg-(--accent-soft)/30 hover:text-(--accent-strong) focus-visible:ring-2 focus-visible:ring-(--focus-ring) focus-visible:ring-offset-2 focus-visible:ring-offset-(--bg-primary) focus-visible:outline-none"
					aria-label="toogle theme"
				>
					{theme === 'light'
						? (
								<i className="i-mingcute-sun-line text-lg text-yellow-500" />
							)
						: (
								<i className="i-mingcute-moon-stars-fill text-lg text-(--accent-strong)" />
							)}
				</button>
			</div>
		</footer>
	)
}
