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
						className="mt-4 flex flex-row items-center justify-center rounded-lg bg-gray-200 px-4 py-2 shadow-lg shadow-transparent/5 transition-all duration-300 will-change-transform hover:scale-105 hover:bg-gray-300/80 sm:mt-0 dark:bg-gray-600 dark:hover:bg-gray-600/90"
						href={link.website || '#'}
						target={link.website ? '_blank' : undefined}
						rel={link.website ? 'noopener noreferrer' : undefined}
					>
						<div>
							<Image
								className="rounded-md"
								src={link.image}
								alt={link.title}
								width={64}
								height={64}
								loading="lazy"
							/>
						</div>
						<div className="ml-5 flex-grow">
							<h2 className="text-(-text-primary) font-medium">
								{link.title}
							</h2>
							<p className="text-sm text-(--text-secondary)">
								{link.description}
							</p>
						</div>
					</a>
				))}
			</div>
		</>
	)
}
