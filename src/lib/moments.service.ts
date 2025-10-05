import type { CreateMomentInput, GetMomentsQuery, UpdateMomentInput } from '@/lib/moments.schema'
import type { Moment } from '@/types/moment'
import { Prisma } from '@/generated/prisma'
import { prisma } from '@/lib/prisma'

/**
 * Moment data access layer
 * Handles database operations with minimal transformation logic
 */
export class MomentService {
	/**
	 * Retrieves paginated moments with optional tag filtering
	 * Note: Tag filtering uses string_contains to search within the JSON array
	 */
	static async findAll(query: GetMomentsQuery) {
		const { limit, offset, tag } = query
		const where: Prisma.MomentWhereInput = tag
			? { tags: { path: '$', string_contains: tag } }
			: {}

		const [moments, total] = await Promise.all([
			prisma.moment.findMany({
				where,
				orderBy: { createdAt: 'desc' },
				take: limit,
				skip: offset,
			}),
			prisma.moment.count({ where }),
		])

		return {
			data: moments as unknown as Moment[],
			total,
			limit,
			offset,
		}
	}

	/**
	 * Retrieves a single moment by ID
	 */
	static async findById(id: string): Promise<Moment | null> {
		const moment = await prisma.moment.findUnique({
			where: { id },
		})

		return moment as unknown as Moment | null
	}

	/**
	 * Creates a new moment
	 */
	static async create(data: CreateMomentInput): Promise<Moment> {
		const moment = await prisma.moment.create({
			data: {
				content: data.content,
				images: data.images ? (data.images as Prisma.InputJsonValue) : Prisma.JsonNull,
				tags: data.tags ? (data.tags as Prisma.InputJsonValue) : Prisma.JsonNull,
			},
		})

		return moment as unknown as Moment
	}

	/**
	 * Updates moment by ID
	 * @throws PrismaClientKnownRequestError (P2025) if moment not found
	 */
	static async update(id: string, data: UpdateMomentInput): Promise<Moment> {
		const moment = await prisma.moment.update({
			where: { id },
			data: {
				...(data.content !== undefined && { content: data.content }),
				...(data.images !== undefined && {
					images: data.images ? (data.images as Prisma.InputJsonValue) : Prisma.JsonNull,
				}),
				...(data.tags !== undefined && {
					tags: data.tags ? (data.tags as Prisma.InputJsonValue) : Prisma.JsonNull,
				}),
			},
		})

		return moment as unknown as Moment
	}

	/**
	 * Deletes moment by ID
	 * @throws PrismaClientKnownRequestError (P2025) if moment not found
	 */
	static async delete(id: string): Promise<void> {
		await prisma.moment.delete({
			where: { id },
		})
	}
}
