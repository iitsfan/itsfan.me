import { cn } from '@/lib/utils'

type IconBadgeVariant = 'tech' | 'social'

interface IconBadgeProps {
	icon: string
	text: string
	variant: IconBadgeVariant
	href?: string
	className?: string
}

const variantStyles: Record<IconBadgeVariant, string> = {
	tech: 'rounded-lg border border-gray-300 bg-gray-100 px-2 py-1 select-none dark:bg-gray-900 dark:border-gray-700',
	social: 'border-b-2 border-dashed border-blue-200 cursor-pointer transition-color duration-300 hover:border-blue-400',
}

export default function IconBadge({
	icon,
	text,
	variant,
	href,
	className,
}: IconBadgeProps) {
	const content = (
		<>
			<i className={cn(icon, 'text-base')} />
			{text}
		</>
	)

	if (href) {
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className={cn(
					'flex items-center justify-center gap-1 text-sm font-semibold',
					variantStyles[variant],
					className,
				)}
			>
				{content}
			</a>
		)
	}

	return (
		<span className={cn(
			'flex items-center justify-center gap-1 text-sm font-semibold',
			variantStyles[variant],
			className,
		)}
		>
			{content}
		</span>
	)
}
