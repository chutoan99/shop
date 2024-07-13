import express from 'express'
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import configSocketIO from './configs/socketio'
import startServer from './server'
import connectMongoDB from './configs/mongodb'

// Create an Express app
const app = express()
const server = http.createServer(app)

// Enable CORS middleware
app.use(cors()) // This is enough for basic CORS configuration
app.options('*', cors()) // Handle preflight requests

// Middleware
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(
	bodyParser.urlencoded({
		limit: '50mb',
		extended: true,
		parameterLimit: 50000
	})
)

// Database connections
connectMongoDB()

// Initialize routes and socket.io configuration
configSocketIO(server)

// Enable CORS middleware
app.use(function (req: any, res: any, next: any) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	next()
})

startServer(server)
