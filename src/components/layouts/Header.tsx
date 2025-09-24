import Navigation from './Navigation'

export default function Header() {
	return (
		<div className="fixed top-0 right-0 left-0 z-50 w-screen transform-gpu
        bg-white/40 px-4 backdrop-blur-sm backdrop-saturate-125 sm:px-0 dark:bg-gray-900/20"
		>
			<div className="m-auto flex max-w-xl flex-row justify-between py-3">
				<div className="flex items-center justify-center">
					<h1 className="text-xl font-bold">@FAN</h1>
				</div>
				<Navigation />
			</div>
		</div>
	)
}
