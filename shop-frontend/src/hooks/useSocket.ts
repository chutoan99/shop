import { EnvConfig } from '@configs/env.config'
import { IMessageModel } from '@models/mess.model'
import { IRoomExtra } from '@models/room.model'
import { useEffect, useMemo, useState } from 'react'
import socketIOClient from 'socket.io-client'

export default function useSocketIo() {
	const host = EnvConfig.chatUrl
	const socketIo = useMemo(() => socketIOClient(host), [host])
	const [currentRoom, setCurrentRoom] = useState<IRoomExtra | null>()
	const [newMess, setNewMess] = useState<IMessageModel>()
	const [listMess, setListMess] = useState<IMessageModel[]>([])
	const [isLoadingRoom, setIsLoadingRoom] = useState(false)

	useEffect(() => {
		const handelAddNewChat = (newChat: IMessageModel) => {
			setNewMess(newChat)
		}

		socketIo.on('receive_message', (response: IMessageModel) => handelAddNewChat(response))

		return () => {
			socketIo.off('receive_message')
		}
	}, [socketIo, newMess, listMess])

	useEffect(() => {
		if (Number(newMess?.room_id) === currentRoom?.roomId && newMess) {
			console.log(newMess, 'newChatnewChat')

			setListMess((prev) => [
				...prev,
				{
					content: newMess.content,
					room_id: newMess.room_id,
					from_id: newMess.from_id,
					to_id: newMess.to_id,
					type: newMess.type,
					createdAt: newMess.createdAt,
					updatedAt: newMess.updatedAt
				}
			])
		}
	}, [listMess, newMess])

	return { socketIo, isLoadingRoom, newMess, listMess, setListMess, setCurrentRoom, currentRoom }
}
