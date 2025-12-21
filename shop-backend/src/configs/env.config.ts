import dotenv from 'dotenv'
dotenv.config()

// dotenv.config({
// 	path:
// 		process.env.NODE_ENV === 'production'
// 			? '.env'
// 			: `.env.${process.env.NODE_ENV}`
// })

const EnvConfig = {
	server: {
		envName: process.env.NODE_ENV,
		port: process.env.PORT || '3000',
		urlBackEnd: process.env.URL_BACKEND,
		urlData: process.env.URL_DATA
	},
	app: {
		tokenSecret: process.env.ACCSEE_TOKEN_SECRECT,
		secretKey: process.env.SECRET_KEY,
		limit: process.env.LIMIT,
		swagger: process.env.SCHEMES_SWAGGER
	},
	email: {
		enable:
			!process.env.EMAIL_ENABLE || process.env.EMAIL_ENABLE === 'true',
		user: process.env.USER_EMAIL,
		pass: process.env.PASS_EMAIL
	},
	sqlServer: {
		enable:
			!process.env.SQL_SERVER_ENABLE ||
			process.env.SQL_SERVER_ENABLE === 'true',
		user: process.env.SQL_SERVER_USER,
		password: process.env.SQL_SERVER_PASSWORD,
		port: process.env.SQL_SERVER_PORT,
		server: process.env.SQL_SERVER_HOST,
		database: process.env.SQL_SERVER_DATABA
	},
	firebase: {
		enable:
			!process.env.FIREBASE_ENABLE ||
			process.env.FIREBASE_ENABLE === 'true',
		type: 'service_account',
		universeDomain: 'googleapis.com',
		authUri: 'https://accounts.google.com/o/oauth2/auth',
		tokenUri: 'https://oauth2.googleapis.com/token',
		authProviderX509CertUrl: 'https://www.googleapis.com/oauth2/v1/certs',
		clientId: process.env.FIREBASE_CLIENT_ID,
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
		projectId: process.env.FIREBASE_PROJECT_ID,
		privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
		privateKey: process.env.FIREBASE_PRIVATE_KEY,
		clientX509CertUrl: process.env.FIREBASE_CLIENT_CERT_URL
	},
	cloudinary: {
		enable:
			!process.env.CLOUDINARY_ENABLE ||
			process.env.CLOUDINARY_ENABLE === 'true',
		cloudName: process.env.CLOUDINARY_NAME,
		apiKey: process.env.CLOUDINARY_KEY,
		apiSecret: process.env.CLOUDINARY_SECRET
	},
	passportGoogle: {
		enable:
			!process.env.GOOGLE_ENABLE || process.env.GOOGLE_ENABLE === 'true',
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET
	},
	passportFacebook: {
		enable:
			!process.env.FACEBOOK_ENABLE ||
			process.env.FACEBOOK_ENABLE === 'true',
		clientID: process.env.FACEBOOK_APP_ID,
		clientSecret: process.env.FACEBOOK_APP_ID
	},
	mysql: {
		enable:
			!process.env.MYSQL_ENABLE || process.env.MYSQL_ENABLE === 'true',
		host: process.env.MYSQL_HOST,
		name: process.env.MYSQL_NAME,
		user: process.env.MYSQL_USERNAME,
		password: process.env.MYSQL_PASSWORD,
		port: process.env.MYSQL_PORT
	},
	redis: {
		enable:
			!process.env.REDIS_ENABLE || process.env.REDIS_ENABLE === 'true',
		url: process.env.REDIS_URL
	},
	mongo: {
		enable:
			!process.env.MONGO_ENABLE || process.env.MONGO_ENABLE === 'true',
		url: process.env.MONGODB_URL
	},
	elasticsearch: {
		enable:
			!process.env.ELASTICSEARCH_ENABLE ||
			process.env.ELASTICSEARCH_ENABLE === 'true',
		url: process.env.ELASTICSEARCH_URL,
		userName: process.env.ELASTICSEARCH_USERNAME,
		password: process.env.ELASTICSEARCH_PASSWORD,
		privateKey: process.env.ELASTICSEARCH_KEY,
		ca: process.env.ELASTICSEARCH_CA,
		cert: process.env.ELASTICSEARCH_CERT
	},
	rabbitmq: {
		enable:
			!process.env.ELASTICSEARCH_ENABLE ||
			process.env.ELASTICSEARCH_ENABLE === 'true',
		url: process.env.RABBITMQ_URL,
		host: process.env.RABBITMQ_HOST,
		port: process.env.RABBITMQ_PORT,
		userName: process.env.RABBITMQ_USER,
		password: process.env.RABBITMQ_PASSWORD
		// privateKey: process.env.RABBITMQ_KEY,
		// ca: process.env.RABBITMQ_CA,
		// cert: process.env.RABBITMQ_CERT
	},
	telegramToken: process.env.TELEGRAM_TOKEN
}

export default EnvConfig
