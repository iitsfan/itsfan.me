'use client'

import type { Props as ActivityCalendarProps, ThemeInput } from 'react-activity-calendar'
import type { Activity, ContributionsCalendarProps } from '@/types'
import { useEffect, useState } from 'react'
import { ActivityCalendar } from 'react-activity-calendar'

export function ContributionsCalendar({ username }: ContributionsCalendarProps) {
	const [data, setData] = useState<Activity[]>([])
	const [loading, setLoading] = useState(true)
	const [labelInfo, setLabelInfo] = useState('')

	useEffect(() => {
		const fetchContributions = async (): Promise<void> => {
			try {
				setLoading(true)

				const response = await fetch(`/api/github/contributions?username=${username}`)

				if (response.ok) {
					const contributions: Activity[] = await response.json()
					setData(contributions)
					setLabelInfo('{{count}} contributions in the last year')
				}
				else {
					const fallbackData: Activity[] = [
						{
							date: '2025-01-01',
							count: 0,
							level: 0,
						},
						{
							date: '2025-12-31',
							count: 0,
							level: 0,
						},
					]
					setData(fallbackData)
					setLabelInfo('No contributions found :(')
				}
			}
			catch (error: any) {
				setLabelInfo(error.message || 'No contributions found :(')
			}
			finally {
				setLoading(false)
			}
		}

		fetchContributions()
	}, [username])

	const theme: ThemeInput = {
		light: [
			'var(--calendar-bg)',
			'var(--calendar-level-1)',
			'var(--calendar-level-2)',
			'var(--calendar-level-3)',
			'var(--calendar-level-4)',
		],
		dark: [
			'var(--calendar-bg)',
			'var(--calendar-level-1)',
			'var(--calendar-level-2)',
			'var(--calendar-level-3)',
			'var(--calendar-level-4)',
		],
	}

	// TODO: add tooltip
	const activityCalendarProps: ActivityCalendarProps = {
		data,
		loading,
		theme,
		hideMonthLabels: true,
		labels: {
			totalCount: labelInfo,
		},
	}

	return (
		<ActivityCalendar {...activityCalendarProps} />
	)
}
