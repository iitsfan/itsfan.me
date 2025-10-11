import { friends } from '#site/content'
import Image from 'next/image'
import PageTitle from '@/components/layouts/pageTitle'

export default function Friends() {
	const friendsData = friends[0]

	return (
		<>
			<PageTitle title="🧸 Friends" />

			<div className="mt-8 mb-6 grid-flow-row grid-cols-2 gap-x-7 gap-y-5 sm:grid">
				{friendsData.links.map(link => (
					<a
						key={link.title}
						className="mt-4 flex items-center gap-3 rounded-xl border border-(--border-subtle) bg-(--surface-card) px-4 py-3 shadow-sm transition-all duration-300 will-change-transform hover:-translate-y-1 hover:border-(--accent-strong)/60 hover:bg-(--surface-muted) hover:shadow-md sm:mt-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring) focus-visible:ring-offset-2 focus-visible:ring-offset-(--bg-primary)"
						href={link.website || '#'}
						target={link.website ? '_blank' : undefined}
						rel={link.website ? 'noopener noreferrer' : undefined}
					>
						<div>
							<Image
								className="rounded-md"
								src={link.image}
								alt={link.title}
								width={56}
								height={56}
								loading="lazy"
							/>
						</div>
						<div className="flex flex-1 flex-col gap-1">
							<h2 className="font-medium text-(--text-primary)">
								{link.title}
							</h2>
							<p className="text-xs text-(--text-secondary) sm:text-sm">
								{link.description}
							</p>
						</div>
					</a>
				))}
			</div>
		</>
	)
}
