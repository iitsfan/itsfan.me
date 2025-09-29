export default function PageTitle({ title }: { title: string }) {
	return (
		<div>
			<h2 className="flex-inline items-center text-2xl font-bold text-(--text-primary) sm:text-3xl">
				{ title }
			</h2>
			<hr className="mt-4 h-0.5 border-gray-500 bg-gray-500 opacity-20 dark:border-gray-100 dark:bg-gray-100" />
		</div>
	)
}
