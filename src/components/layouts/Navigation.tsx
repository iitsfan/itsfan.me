import type { ComponentProps } from 'react'
import Link from 'next/link'

function NavigationItem(props: ComponentProps<typeof Link>) {
	return (
		<Link
			{...props}
			className="inline-flex cursor-pointer items-center justify-center rounded-sm px-2 py-1 text-lg font-semibold transition-colors duration-300 hover:bg-gray-200/50 sm:ml-2 sm:py-2 sm:first:ml-0 dark:hover:bg-gray-900"
		>
			{props.children}
		</Link>
	)
}

export default function Navigation() {
	return (
		<div>
			<NavigationItem href="/posts">Posts</NavigationItem>
			<NavigationItem href="/moments">Moments</NavigationItem>
			<NavigationItem href="/friends">Friends</NavigationItem>
			<NavigationItem href="/">About</NavigationItem>
		</div>
	)
}
