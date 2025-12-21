import { Server, Socket } from 'socket.io'
import http from 'http'

export default class SocketService {
	private static instance: SocketService | null = null
	private _io: Server
	public getIo(): Server | null {
		return this._io
	}

	constructor(server: http.Server) {
		this._io = new Server(server, {
			cors: { origin: '*' }
		})
	}

	public static async init(server: http.Server) {
		if (!this.instance) {
			this.instance = new SocketService(server)
		}
	}

	public static getInstance(): SocketService {
		if (!this.instance) {
			throw new Error('RedisClient instance not initialized')
		}

		return this.instance
	}

	public async disconnect(): Promise<void> {
		await this._io.on('disconnect', (socket: Socket) => {
			console.log('A user disconnected')
		})

		// Logger.info('Disconnected redis server');
	}
}
