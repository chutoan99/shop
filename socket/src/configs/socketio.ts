import { Server, Socket } from 'socket.io'

const configSocketIO = (server: any) => {
	const io = new Server(server, {
		cors: { origin: '*' }
	})
	// Event listener for new connections
	io.on('connection', (socket: Socket) => {
		//? Chat
		console.log(socket)
		socket.on('disconnect', () => {
			console.log('A user disconnected')
		})
	})
}

export default configSocketIO
