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
			<footer className="mb-2 flex w-full items-center justify-center">
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
		<footer className="mb-2 flex w-full items-center justify-center">
			<div className="flex max-w-xl flex-1 items-center gap-x-2">
				<p className="block font-bold">
					© 2025 – FAN
				</p>
				<button
					onClick={toggleTheme}
					className="flex cursor-pointer items-center justify-center rounded-md p-1"
					aria-label="toogle theme"
				>
					{theme === 'light'
						? (
								<i className="i-mingcute-sun-line text-lg text-yellow-500" />
							)
						: (
								<i className="i-mingcute-moon-stars-fill text-lg text-blue-200" />
							)}
				</button>
			</div>
		</footer>
	)
}
