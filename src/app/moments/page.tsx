import PageTitle from '@/components/layouts/pageTitle'
import MomentCard from '@/components/momentCard'
import { MomentService } from '@/lib/moments.service'

export default async function Moments() {
	const { data: moments } = await MomentService.findAll({
		limit: 10,
		offset: 0,
	})

	return (
		<>
			<PageTitle title="📸 Moments" />
			<div className="mt-8 space-y-6">
				{
					moments.map(moment => (
						<MomentCard key={moment.id} item={moment} />
					))
				}
			</div>
		</>
	)
}
