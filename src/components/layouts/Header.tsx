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
				'bg-white/40 px-4 py-1 backdrop-blur-sm backdrop-saturate-125 sm:px-0 sm:py-0',
				'dark:bg-gray-900/20',
			)}
			>
				<div className="m-auto flex max-w-xl flex-col justify-center py-3 sm:flex-row sm:items-center">
					<div className="flex flex-grow items-center justify-between">
						<div className="flex items-center select-none">
							<h1 className="text-xl font-bold">@FAN</h1>
						</div>

						<button
							onClick={toggleMenu}
							className={cn(
								'flex cursor-pointer items-center justify-center rounded-sm p-1 text-xl',
								'transition-colors duration-300 sm:hidden',
								'hover:bg-gray-200/50 dark:hover:bg-gray-900',
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
