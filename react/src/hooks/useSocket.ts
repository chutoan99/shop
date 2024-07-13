import { useEffect, useMemo, useState } from 'react'
import socketIOClient from 'socket.io-client'

export default function useSocketIo() {
	const host = `${(import.meta as any).env.VITE_REACT_APP_API_HOST_CHAT}` as string
	const socketIo = useMemo(() => socketIOClient(host), [host])
	const [listMess, setListMess] = useState<any[]>([])
	const [isLoadingRoom, setIsLoadingRoom] = useState(false)
	useEffect(() => {
		const handleSocketMessage = (response: any) => {
			setIsLoadingRoom(true)
			if (response.length > 0) {
				setListMess(response)
				setIsLoadingRoom(false)
			} else {
				setListMess([])
				setIsLoadingRoom(false)
			}
		}
		socketIo.on('message', handleSocketMessage)
		socketIo.on('room', handleSocketMessage)
		return () => {
			socketIo.off('message', handleSocketMessage)
			socketIo.off('room', handleSocketMessage)
		}
	}, [socketIo])

	return { listMess, socketIo, isLoadingRoom }
}
