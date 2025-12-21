import { UserRepository } from '@order/imports'
import UserHandlerListeners from '@user/listeners/user-handler.listeners'
import { ServiceContext } from 'src/server'

export const UserConsumer = (sctx: ServiceContext) => {
	const userRepository = new UserRepository(
		sctx.loggerService,
		sctx.mySQLService
	)

	new UserHandlerListeners(
		sctx.loggerService,
		sctx.redisService,
		userRepository
	).subscribe()
}

export default UserConsumer
