'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Navigation from './Navigation'

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const closeMenu = () => {
		setIsMenuOpen(false)
	}

	return (
		<>
		<div className={cn(
			'fixed top-0 right-0 left-0 z-50 w-screen transform-gpu',
			'bg-(--surface-overlay) px-4 py-1 backdrop-blur-md backdrop-saturate-150 transition-colors sm:px-0 sm:py-0',
		)}
			>
				<div className="m-auto flex max-w-xl flex-col justify-center py-3 sm:flex-row sm:items-center">
					<div className="flex flex-grow items-center justify-between">
						<div className="flex items-center select-none">
							<h1 className="text-lg font-bold text-(--text-primary)">@FAN</h1>
						</div>

						<button
							onClick={toggleMenu}
					className={cn(
						'flex cursor-pointer items-center justify-center rounded-sm p-1 text-xl',
						'transition-colors duration-300 text-(--text-secondary) sm:hidden',
						'hover:bg-(--accent-soft) hover:text-(--text-primary)',
						'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring) focus-visible:ring-offset-2 focus-visible:ring-offset-(--bg-primary)',
					)}
							aria-expanded={isMenuOpen}
							aria-label={isMenuOpen ? 'close nav menu' : 'open nav menu'}
						>
							<i className={cn(
								'transition-transform duration-200',
								isMenuOpen ? 'i-mingcute-close-fill' : 'i-mingcute-menu-fill',
							)}
							/>
						</button>
					</div>

					<Navigation isOpenMenu={isMenuOpen} onNavClick={closeMenu} />
				</div>
			</div>

			{isMenuOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/20 sm:hidden"
					onClick={closeMenu}
					aria-hidden="true"
				/>
			)}
		</>
	)
}
