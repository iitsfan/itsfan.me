/**
 * Moment data type definitions
 */
export interface Moment {
	id: string
	content: string
	images: string[] | null
	tags: string[] | null
	createdAt: Date
	updatedAt: Date
}

/**
 * API response formats
 */
export interface MomentListResponse {
	data: Moment[]
	total: number
	limit: number
	offset: number
}

export interface MomentResponse {
	data: Moment
}

export interface ErrorResponse {
	error: string
	message?: string
	details?: unknown
}
