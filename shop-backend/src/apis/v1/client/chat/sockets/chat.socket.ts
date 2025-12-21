import ChatService from '../services/chat.service'
import { Socket } from 'socket.io'
export interface IMessChat {
	fromId: number
	toId: number
	roomId: string
	type: string
	content: {
		message: string
		type: string
	}
}

export default class ChatSocket {
	constructor(private readonly _chatService: ChatService) {}

	connection(socket: Socket) {
		socket.on('disconnect', () => {
			console.log(`User disconnect id is ${socket.id}`)
		})

		socket.on('typing', (user) => {
			console.log(`User is typing ${user.id}`)
		})

		socket.on('join_room', (room) => {
			socket.join(room)
			console.log(`User ${socket.id} joined room ${room}`)
		})

		socket.on('send_message', async (response: IMessChat) => {
			if (!+response?.fromId) return
			try {
				const chatId = await this._chatService.saveMessage(response)
				const newChat = await this._chatService.getNewMessage(
					chatId,
					response.roomId
				)
				socket.to(response.roomId).emit('receive_message', newChat)
			} catch (error) {
				console.error('Error:', error)
			}
		})
	}
}
