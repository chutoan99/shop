import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { io, Socket } from 'socket.io-client'
import { ShopInfor } from 'src/types/inforShop.model'
import { MessModel } from 'src/types/mess.model'
import { UserInfor } from 'src/types/user.model'

interface Mess {
	user: ShopInfor
	shop: UserInfor
	roomid: number
	message: string
}

@Injectable({
	providedIn: 'root'
})
export class SocketioService {
	public listMess$: BehaviorSubject<any> = new BehaviorSubject<MessModel[]>([])
	public message$: BehaviorSubject<any> = new BehaviorSubject<Mess>({
		user: {} as ShopInfor,
		shop: {} as UserInfor,
		roomid: 0,
		message: ''
	})

	constructor(private readonly _socket: Socket) {
		this._socket = io('http://localhost:8000')

		this._socket.on('message', (data: MessModel[]) => {
			console.log(data, 'New message received')
			this.message$.next(data)
		})

		this._socket.on('room', (data: MessModel[]) => {
			this.listMess$.next(data)
		})
	}

	disconnect() {
		this._socket.disconnect()
	}

	sendMessage(data: Mess): void {
		this._socket.emit('message', data)
	}

	activeRoom(roomid: number) {
		this._socket.emit('room', roomid)
	}

	getMessage() {
		return this.listMess$
	}
}
