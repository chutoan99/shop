import { generateCmtId } from '@helpers/generateId.helper'
import { MESSAGE } from '@core/resources'
import { Builder } from 'builder-pattern'
import { CreateCommentDto } from '../dto'
import LoggerService from '@core/libs/logger/logger.system'
import { CommentModel } from '../model'
import { IOrderCommentRepository, IOrderCommentService } from '../interface'
import { UserModel, UserRepository } from '@order/imports'

export default class OrderCommentService implements IOrderCommentService {
	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _userRepository: UserRepository,
		private readonly _orderCommentRepository: IOrderCommentRepository
	) {}

	public createComment = async (
		userid: number,
		payload: CreateCommentDto
	): Promise<boolean> => {
		try {
			const user: UserModel = await this._userRepository.findByID(userid)

			const comment: CommentModel = Builder<CommentModel>()
				.id(generateCmtId())
				.order_id(payload?.order_id)
				.item_id(payload?.item_id)
				.user_id(userid)
				.shop_id(payload?.shop_id)
				.comment(payload?.comment)
				.rating_star(payload?.rating_star)
				.author_username(user?.name)
				.author_portrait(user?.avatar)
				// .images(payload?.images)
				.tier_variation(payload?.tier_variation)
				.list_option(payload?.list_option)
				.level(0)
				.is_shop(false)
				.like_count(0)
				.liked(false)
				.build()

			const isCreated: boolean =
				await this._orderCommentRepository.create(comment)

			if (!isCreated) {
				throw new Error(MESSAGE.CREATE.FAIL)
			}

			return isCreated
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}
}
