import { MESSAGE } from '@core/resources'
import { generateLikeId } from '@helpers/generateId.helper'
import { Builder } from 'builder-pattern'
import LoggerService from '@core/libs/logger/logger.system'
import { CreatePostLikeDto } from '../dto'
import { PostLikeModel } from '../model'
import { plainToClass, plainToInstance } from 'class-transformer'
import { IPostLikeRepository, IPostLikeService } from '../interface'

export default class PostLikeService implements IPostLikeService {
	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _postLikeRepository: IPostLikeRepository
	) {}

	public findLikes = async (userId: number): Promise<PostLikeModel[]> => {
		try {
			const response: PostLikeModel[] =
				(await this._postLikeRepository.findAll(
					userId
				)) as PostLikeModel[]
			return response
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public createLike = async (
		payload: CreatePostLikeDto,
		userId: number
	): Promise<boolean> => {
		try {
			await this.checkExistLike(payload.item_id)

			const newLike: PostLikeModel = Builder<PostLikeModel>()
				.id(generateLikeId())
				.user_id(userId)
				.item_id(payload.item_id)
				.shop_id(payload.shop_id)
				.build()

			const isCreated: boolean = await this._postLikeRepository.create(
				newLike
			)

			if (!isCreated) {
				throw new Error(MESSAGE.CREATE.FAIL)
			}

			return isCreated
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public deleteLike = async (id: number): Promise<boolean> => {
		try {
			const isDeleted: boolean = await this._postLikeRepository.delete(id)

			if (!isDeleted) {
				throw new Error(MESSAGE.DELETE.FAIL)
			}

			return isDeleted
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	public checkExistLike = async (id: number): Promise<void> => {
		try {
			const existingUser: PostLikeModel = plainToClass(
				PostLikeModel,
				await this._postLikeRepository.find(id)
			)

			if (existingUser) {
				throw new Error('Likes Already Exists')
			}
		} catch (error: any) {
			this._loggerService.error(error.message || error)
			throw Error(error.message || error)
		}
	}
}
