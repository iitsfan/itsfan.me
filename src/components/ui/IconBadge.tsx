import { cn } from '@/lib/utils'

type IconBadgeVariant = 'tech' | 'social' | 'moment' | 'tag' | 'category'

interface IconBadgeProps {
	icon?: string
	text: string
	variant: IconBadgeVariant
	href?: string
	className?: string
}

const baseClasses = 'flex items-center justify-center gap-1 text-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring) focus-visible:ring-offset-2 focus-visible:ring-offset-(--bg-primary)'

const variantStyles: Record<IconBadgeVariant, string> = {
	tech: 'rounded-lg border border-(--border-subtle) bg-(--surface-muted) px-2.5 py-1 font-semibold select-none text-(--text-secondary) hover:border-(--accent-strong)/60 hover:text-(--text-primary) hover:bg-(--surface-card) hover:shadow-sm',
	social: 'border-b-2 border-dashed border-b-(--accent) font-semibold text-(--accent) hover:border-b-(--accent-strong) hover:text-(--accent-strong)',
	moment: 'font-semibold text-(--accent-strong) hover:bg-(--accent-soft)/25 px-2 py-0.5 rounded',
	tag: 'inline-flex cursor-default items-center justify-start gap-0 font-medium text-(--accent) transition-colors duration-200 hover:text-(--accent-strong)',
	category: 'inline-flex cursor-default items-center justify-start font-medium text-sm text-(--text-tertiary)',
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
			{icon ? <i className={cn(icon, 'text-base')} /> : null}
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
					baseClasses,
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
			baseClasses,
			variantStyles[variant],
			className,
		)}
		>
			{content}
		</span>
	)
}
