import ChatModel from '../schemas/chat.schema'
import { IMessChat } from '../sockets/chat.socket'

export default class ChatService {
	public saveMessage = async (payload: IMessChat) => {
		const newChat = new ChatModel({
			room_id: payload.roomId,
			content: {
				mess: payload.content.message,
				type: payload.content.type
			},
			type: payload.type,
			from_id: +payload.fromId,
			to_id: +payload.toId
		})
		await newChat.save()

		return newChat.id
	}

	public getNewMessage = async (chatId: string, roomId: string) => {
		const response: typeof ChatModel | null = await ChatModel.findOne({
			_id: chatId,
			room_id: roomId
		})
		return response
	}

	public getMessages = async (
		roomId: number,
		userid: number,
		shopId?: number
	) => {
		const response: (typeof ChatModel)[] | [] = await ChatModel.find({
			room_id: roomId
		})
		return response
	}
}
