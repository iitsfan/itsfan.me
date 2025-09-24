import type { ComponentProps } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavigationProps {
	isOpenMenu: boolean
	onNavClick: () => void
}

function NavigationItem(props: ComponentProps<typeof Link> & { onClick?: () => void }) {
	return (
		<Link
			{...props}
			className={cn(
				'block cursor-pointer rounded-sm px-2 py-1 text-lg font-semibold',
				'transition-colors duration-300',
				'hover:bg-gray-200/40 dark:hover:bg-gray-900/40',
				'sm:ml-2 sm:py-2 sm:first:ml-0',
			)}
		>
			{props.children}
		</Link>
	)
}

export default function Navigation({ isOpenMenu, onNavClick }: NavigationProps) {
	const navigationItems = [
		{ href: '/posts', label: 'Posts' },
		{ href: '/moments', label: 'Moments' },
		{ href: '/friends', label: 'Friends' },
		{ href: '/', label: 'About' },
	]

	const handleNavContainerClick = (e: React.MouseEvent) => {
		e.stopPropagation()
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			onNavClick()
		}
	}

	return (
		<nav
			className={cn(
				'overflow-hidden transition-all duration-200 ease-in-out',
				'sm:flex sm:max-h-96 sm:items-center sm:p-0 sm:opacity-100',
				isOpenMenu ? 'max-h-96 pt-2' : 'max-h-0 pt-0',
			)}
			aria-label="nav menu"
		>
			<div
				className="flex-row items-center justify-center sm:flex"
				role="menubar"
				tabIndex={0}
				onClick={handleNavContainerClick}
				onKeyDown={handleKeyDown}
			>
				{navigationItems.map(item => (
					<NavigationItem
						key={item.href}
						href={item.href}
						onClick={onNavClick}
						role="menuitem"
						aria-label={`nav to ${item.label}`}
					>
						{item.label}
					</NavigationItem>
				))}
			</div>
		</nav>
	)
}
