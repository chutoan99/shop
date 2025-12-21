import express from 'express'
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import bootServer from './server'

process.on('uncaughtException', (err) => {
	console.error('❌ Uncaught Exception:', err)
})

process.on('unhandledRejection', (reason) => {
	console.error('❌ Unhandled Rejection:', reason)
})

// Create an Express app
const app = express()

const server: http.Server = http.createServer(app)
const allowedOrigins = ['https://shop-front-end.netlify.app']

app.use(
	cors({
		origin: (origin, callback) => {
			// Cho phép tất cả các localhost và 127.0.0.1
			if (
				!origin ||
				origin.startsWith('http://localhost:') ||
				origin.startsWith('http://127.0.0.1:') ||
				allowedOrigins.includes(origin)
			) {
				callback(null, true)
			} else {
				callback(new Error('Not allowed by CORS'))
			}
		},
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
		credentials: true
	})
)
	.options('*', cors()) // Handle preflight requests
	.use(cookieParser())
	.use(express.json())
	.use(bodyParser.json({ limit: '50mb' }))
	.use(
		bodyParser.urlencoded({
			limit: '50mb',
			extended: true,
			parameterLimit: 50000
		})
	)
	.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*')
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
		res.setHeader(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept'
		)
		next()
	})

// Start the server
bootServer(app, server)
