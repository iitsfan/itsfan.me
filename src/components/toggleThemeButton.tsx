'use client'

import { useTheme } from 'next-themes'

export default function ToggleThemeButton() {
	const { theme, setTheme } = useTheme()

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	return (
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
	)
}
