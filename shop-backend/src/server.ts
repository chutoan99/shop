import { Express } from 'express'
import swaggerUi from 'swagger-ui-express'
import { Socket } from 'socket.io'

import RedisService from '@core/libs/redis/redis.service'
import SocketService from '@core/libs/socket/socket.service'
import CloudINaryService from '@core/libs/uploads/services/cloudinary.service'
import UploadModule from '@core/libs/uploads/upload.module'
import LoggerService from '@core/libs/logger/logger.system'
import MySQLService from '@core/libs/mysql/mysql.service'
import swaggerDocument from '@configs/swagger.json'
import CloudINaryConfig from '@configs/cloudinary.config'
import RedisConfig from '@configs/redis.config'
import MongooseConfig from '@configs/mongodb.config'
import FirebaseAdminConfig from '@configs/firebase.config'
import MySQLConfig from '@configs/mysql.config'
import PassportConfig from '@configs/passport.config'
import EnvConfig from '@configs/env.config'
import ChatService from '@chat/services/chat.service'
import ChatSocket from '@chat/sockets/chat.socket'
import ShopModule from '@shop/shop.module'
import UserModule from '@user/user.module'
import AuthModule from '@auth/auth.module'
import PostModule from '@post/post.module'
import ChatModule from '@chat/chat.module'
import CartModule from '@cart/cart.module'
import OrderModule from '@order/order.module'
import NotifyModule from '@notify/notify.module'
import IndustryModule from '@industry/industry.module'
import SysTemModule from '@systems/system.module'
import ElasticsearchConfig from '@configs/elastic-search.config'
import { ElasticSearchService } from '@core/libs/elastic-search/elastic-search.services'
import RabbitMQConfig from '@configs/rabbitmq.config'
import CrawlRoute from './apis/v1/crawl/route'
import InsertModule from './apis/v1/insert/shopee/insert.module'
import { RabbitMqService } from '@core/libs/rabbitmq/rabbit-mq.service'
import RedisPubSubService from '@core/libs/redis/redis-pub-sub.service'
import ScheduleService from '@core/libs/schedule/schedule.service'
import AccessControlListModule from '@core/libs/access-control-list/access-control-list.module'
import { LifecycleManager } from '@core/services/lifecycle-manager.service'

const loggerService = LoggerService.getInstance()!
const serveSwagger = swaggerUi.serveFiles(swaggerDocument)

export type ServiceContext = {
	redisService: RedisService
	// elasticSearchService: ElasticSearchService
	mySQLService: MySQLService
	loggerService: LoggerService
	cloudINaryService: CloudINaryService
	rabbitMqService: RabbitMqService
	eventPublisher: RedisPubSubService
}

const bootServer = async (app: Express, server: any) => {
	console.log(EnvConfig, 'EnvConfig')
	PassportConfig()
	new ScheduleService().initialize()

	// connectTeleGram()

	const rabbitMQConfig = await RabbitMQConfig.getInstance()
	if (!rabbitMQConfig) {
		console.error('Failed to initialize RabbitMQ connection.')
	}

	const cloudinaryConfig = await CloudINaryConfig.getInstance()
	if (!cloudinaryConfig) {
		console.error('Failed to initialize Cloudinary connection.')
	}

	const redisConfig = await RedisConfig.getInstance()
	if (!redisConfig.getClient()) {
		console.error('❌ Failed to initialize Redis connection.')
	}

	// const elasticsearchConfig = await ElasticsearchConfig.getInstance()
	// if (!elasticsearchConfig.getClient()) {
	// 	console.error('Failed to initialize Elasticsearch connection.')
	// }

	const mongooseConfig = await MongooseConfig.getInstance()
	if (!mongooseConfig.getPool()) {
		console.error('Failed to initialize Mongoose connection pool.')
	}

	const firebaseAdminConfig = await FirebaseAdminConfig.getInstance()
	if (!firebaseAdminConfig) {
		console.error('Failed to initialize Firebase connection.')
	}

	const mysqlConfig = await MySQLConfig.getInstance()
	if (!mysqlConfig.getPool()) {
		console.error('Failed to initialize MySQL connection pool.')
	}

	const connectionUrl = String(EnvConfig.redis?.url)
	await RedisPubSubService.init(connectionUrl)
	await SocketService.init(server)
	const serviceCtx: ServiceContext = {
		redisService: new RedisService(),
		// elasticSearchService: new ElasticSearchService(),
		mySQLService: new MySQLService(),
		loggerService: new LoggerService(),
		cloudINaryService: new CloudINaryService(),
		rabbitMqService: new RabbitMqService(),
		eventPublisher: RedisPubSubService.getInstance()
	}

	SocketService.getInstance()
		.getIo()!
		.on('connection', (socket: Socket) => {
			console.log(`A user ${socket.id} connected`)

			const chatService = new ChatService()
			new ChatSocket(chatService).connection(socket)
		})

	app.use(loggerService.getRequestLoggerMiddleware())
	app.use('/api/v1/client', ChatModule(serviceCtx))
	app.use(
		'/api/v1/client/docs',
		serveSwagger,
		swaggerUi.setup(swaggerDocument)
	)
	app.use('/api/v1/admin', AccessControlListModule(serviceCtx))
	app.use('/api/v1/client/shop', ShopModule(serviceCtx))
	app.use('/api/v1/client/user', UserModule(serviceCtx))
	app.use('/api/v1/client/auth', AuthModule(serviceCtx))
	app.use('/api/v1/client/post', PostModule(serviceCtx))
	app.use('/api/v1/client/cart', CartModule(serviceCtx))
	app.use('/api/v1/client/order', OrderModule(serviceCtx))
	app.use('/api/v1/client/notify', NotifyModule(serviceCtx))
	app.use('/api/v1/client/industry', IndustryModule(serviceCtx))
	app.use('/api/v1/client/system', SysTemModule(serviceCtx))
	app.use('/api/v1/client/upload', UploadModule(serviceCtx))
	app.use('/api/v1/crawl', CrawlRoute)
	app.use('/api/v1/insert/shopee', InsertModule(serviceCtx))
	app.use(loggerService.getErrorLoggerMiddleware())

	await LifecycleManager.runModuleInit()

	server.listen(
		EnvConfig.server.port,
		() => console.log(`Server running on port ${EnvConfig.server.port}`),

		await LifecycleManager.runApplicationBootstrap()
	)

	// * If the route does not match any of the above, fall back to this route
	return app.use('/', (req, res) => {
		res.send('server on...')
	})
}

export default bootServer
