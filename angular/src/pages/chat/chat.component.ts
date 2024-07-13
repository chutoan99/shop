import { Component, OnInit } from '@angular/core'
import { SocketioService } from 'src/services/socketio/index.service'
import { Room } from 'src/types/room.model'
import { Observable, of } from 'rxjs'
import { RoomService } from 'src/services/room/index.service'
import { UserInfor } from 'src/types/user.model'
import { ShopInfor } from 'src/types/inforShop.model'
import { ShopInfoService } from 'src/services/shop/index.service'
import { MessModel } from 'src/types/mess.model'

interface Mess {
	user: ShopInfor
	shop: UserInfor
	roomid: number
	message: string
}
@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {
	dataRoom$!: Observable<Room[]>
	dataUser = {} as ShopInfor
	dataMess$!: Observable<MessModel[]>
	payload: Mess = {
		user: this.dataUser,
		shop: {} as UserInfor,
		roomid: 0,
		message: ''
	}

	fetchDataRooms() {
		this.roomService.getRooms().subscribe((data: Room[]) => {
			this.dataRoom$ = of(data)
		})
	}

	fetchDataShop() {
		this.shopService.getInfoShop().subscribe((data: ShopInfor) => {
			this.dataUser = data
		})
	}

	fetchDataMess() {
		this.socketService.getMessage().subscribe((res: MessModel[]) => {
			this.dataMess$ = of(res)
		})
	}

	onChangeRoom(room: Room) {
		this.payload.shop = room.user_info
		this.payload.roomid = room.roomid
		this.socketService.activeRoom(room.roomid)
	}

	onSendMessage() {
		this.socketService.sendMessage(this.payload)
		this.payload.message = ''
	}

	ngOnInit() {
		this.fetchDataRooms()
		this.fetchDataShop()
		this.fetchDataMess()
	}

	// ngOnDestroy() {
	//   this.socketService.disconnect();
	// }

	constructor(
		private socketService: SocketioService,
		private roomService: RoomService,
		private shopService: ShopInfoService
	) {}
}
