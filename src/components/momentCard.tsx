import type { Moment } from '@/types/moment'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import IconBadge from './ui/IconBadge'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)

interface MomentCardProps {
	item: Moment
}

export default function MomentCard({ item }: MomentCardProps) {
	return (
		<div className="rounded-xl border border-gray-300/50 bg-gray-200/80 p-4 dark:border-gray-600/50 dark:bg-gray-100/10">
			<div className="flex items-center justify-between">
				<h2 className="font-bold">
					@FAN
				</h2>
				<time className="flex items-center text-sm text-gray-600 dark:text-gray-400">
					{dayjs(item.createdAt).fromNow()}
				</time>
			</div>

			<hr className="my-3 h-0.5 bg-gray-900 opacity-5 dark:bg-gray-100" />

			<div className="pb-4">
				<p className="overflow-hidden break-words whitespace-pre-wrap">
					{item.content}
				</p>

				{item.images && item.images.length > 0 && (
					<div className="mt-3 overflow-x-auto">
						<div className="flex gap-2">
							{item.images.map(image => (
								<Image
									key={image}
									className="rounded-lg"
									src={image}
									width={256}
									height={256}
									alt="Moment image"
								/>
							))}
						</div>
					</div>
				)}
			</div>

			<div className="mt-2 flex items-center space-x-2">
				{item.tags && item.tags.length > 0 && item.tags.map(tag => (
					<IconBadge
						key={item.id + tag}
						variant="moment"
						text={`#${tag}`}
					/>
				))}
			</div>

		</div>
	)
}
