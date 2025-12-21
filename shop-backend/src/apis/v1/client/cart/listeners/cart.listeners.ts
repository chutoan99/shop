import SearchPostHistoryEvent from '../events/cart.event'
import CartEvent from '../events/cart.event'
import { MetadataOrder, OrderItem } from '../../order/dtos'
import { MESSAGE } from '@core/resources'
import { ICartRepository } from '../interfaces'
import LoggerService from '@core/libs/logger/logger.system'
import RedisPubSubService from '@core/libs/redis/redis-pub-sub.service'

export default class CartListeners {
	constructor(
		private readonly _loggerService: LoggerService,
		private readonly _cartRepository: ICartRepository
	) {}

	async execute(evt: CartEvent) {
		try {
			const orders = evt.payload as MetadataOrder[]

			if (orders.length > 0) {
				try {
					const deletePromises = orders.flatMap(
						(order: MetadataOrder) =>
							order.items.map((post: OrderItem) =>
								this._cartRepository.deleteByPostId(
									post.item_id,
									evt.userId!
								)
							)
					)

					// Đợi tất cả các tác vụ xóa hoàn thành
					const deleteResults = await Promise.all(deletePromises)
					const allDeleted = deleteResults.every(
						(result) => result === true
					)

					const result = allDeleted
						? { err: 0, msg: MESSAGE.DELETE.SUCCESS }
						: { err: 1, msg: MESSAGE.DELETE.FAIL }

					this._loggerService.warn(JSON.stringify(result))
				} catch (error: any) {
					this._loggerService.error(error)
					throw Error(error.message || error)
				}
			}
		} catch (error: any) {
			this._loggerService.error(error)
			throw Error(error.message || error)
		}
	}

	subscribe() {
		RedisPubSubService.getInstance().subscribe(
			'delete-cart',
			(msg: string) => {
				const data = JSON.parse(msg)
				const evt = SearchPostHistoryEvent.from(data)
				this.execute(evt)
			}
		)
	}
}
