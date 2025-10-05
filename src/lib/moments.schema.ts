import { z } from 'zod'

/**
 * Moment creation validation schema
 */
export const createMomentSchema = z.object({
	content: z
		.string()
		.min(1, 'Content cannot be empty')
		.max(500, 'Content cannot exceed 500 characters'),
	images: z
		.array(z.string().url('Image must be a valid URL'))
		.max(9, 'Maximum 9 images allowed')
		.optional(),
	tags: z
		.array(z.string().min(1).max(5))
		.max(5, 'Maximum 5 tags allowed')
		.optional(),
})

/**
 * Moment update validation schema (all fields optional)
 */
export const updateMomentSchema = z.object({
	content: z
		.string()
		.min(1, 'Content cannot be empty')
		.max(500, 'Content cannot exceed 500 characters')
		.optional(),
	images: z
		.array(z.string().url('Image must be a valid URL'))
		.max(9, 'Maximum 9 images allowed')
		.optional(),
	tags: z
		.array(z.string().min(1).max(20))
		.max(5, 'Maximum 5 tags allowed')
		.optional(),
})

/**
 * Query parameters validation schema
 */
export const getMomentsQuerySchema = z.object({
	limit: z.coerce.number().int().min(1).max(100).default(10),
	offset: z.coerce.number().int().min(0).default(0),
	tag: z.string().optional(),
})

export type CreateMomentInput = z.infer<typeof createMomentSchema>
export type UpdateMomentInput = z.infer<typeof updateMomentSchema>
export type GetMomentsQuery = z.infer<typeof getMomentsQuerySchema>
