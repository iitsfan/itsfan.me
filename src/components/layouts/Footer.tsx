import LanguageSwitch from '@/components//LanguageSwitch'
import ToggleThemeButton from '@/components//toggleThemeButton'

export default function Footer() {
	return (
		<footer className="mb-2 flex w-full items-center justify-center px-4 sm:px-0">
			<div className="flex max-w-xl flex-1 items-center justify-between gap-x-3">
				<p className="block font-bold text-(--text-primary)">
					© 2025 – FAN
				</p>
				<div className="flex items-center gap-x-0.5">
					<LanguageSwitch />
					<ToggleThemeButton />
				</div>
			</div>
		</footer>
	)
}
