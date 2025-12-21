import { ServiceContext } from 'src/server'
import SearchPostHistoryListeners from '../listeners/cart.listeners'
import CartRepository from '../repositories/cart.repository'

export const CartConsumer = (sctx: ServiceContext) => {
	const cartRepository = new CartRepository(
		sctx.loggerService,
		sctx.mySQLService
	)

	new SearchPostHistoryListeners(
		sctx.loggerService,
		cartRepository
	).subscribe()
}

export default CartConsumer
