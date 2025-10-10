import { Suspense } from 'react'
import PageTitle from '@/components/layouts/pageTitle'
import MomentsList from '@/components/momentsList'
import { MomentService } from '@/lib/moments.service'

export default function Moments() {
	return (
		<>
			<PageTitle title="📸 Moments" />
			<Suspense fallback={<MomentsLoading />}>
				<MomentsListWrapper />
			</Suspense>
		</>
	)
}

async function MomentsListWrapper() {
	const { data: moments, total } = await MomentService.findAll({ limit: 5, offset: 0 })
	return <MomentsList initialMoments={moments} initialTotal={total} />
}

function MomentsLoading() {
	return (
		<div className="mt-8 text-sm text-(--text-tertiary)">
			Loading...
		</div>
	)
}
