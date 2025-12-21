import { CommonModule } from '@angular/common'
import {} from '@angular/common/http'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AccountInfoModel } from '@modules/account/models'
import { AccountService } from '@modules/account/services'
import { MessModel } from '@modules/chat/models/mess.model'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { io, Socket } from 'socket.io-client'
import { RoomModel } from '../models'
import { RoomService, ChatService } from '../services'
import { DateAgoPipe } from '@core/pipes'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzEmptyModule } from 'ng-zorro-antd/empty'
import { AppResource } from '@core/resources/app.resource'

@Component({
	selector: 'app-chat',
	templateUrl: '../templates/chat.template.html',
	styleUrls: ['../styles/chat.style.scss'],
	host: {
		'[class.app-chat]': 'true'
	},
	imports: [CommonModule, FormsModule, RouterModule, DateAgoPipe, NzDropDownModule, NzEmptyModule]
})
export class ChatComponent implements OnInit {
	@ViewChild('scrollContainer') private scrollContainer!: ElementRef
	protected userScrolledUp: boolean = false
	protected dataAccount = {} as AccountInfoModel
	protected currentRoom: RoomModel | null = null
	protected dataRoom$!: Observable<RoomModel[]>
	protected dataMess$: BehaviorSubject<MessModel[]> = new BehaviorSubject<MessModel[]>([])
	protected payload: any = {
		fromId: 0,
		toId: 0,
		roomId: 0,
		content: {}
	}
	protected contentChat = {
		message: '',
		type: 'Text'
	}
	private _socket!: Socket

	constructor(
		private readonly _chatService: ChatService,
		private readonly _roomService: RoomService,
		private readonly _accountService: AccountService
	) {
		this._socket = io(AppResource.SOCKET_URL)
	}

	ngOnInit() {
		this._socket.on('receive_message', (mess: MessModel) => {
			if (+mess.room_id === this.currentRoom?.roomId) {
				// Push tin nhắn mới vào mảng
				this.dataMess$.next([...this.dataMess$.getValue(), mess])
			}
			setTimeout(() => this._scrollToBottom(), 50)
		})

		this._socket.on('send_message', (mess: MessModel) => {
			console.log(mess, 'messmess')
		})

		this._fetchDataRooms()
		this._fetchDataShop()
	}

	ngAfterViewInit() {
		this.scrollContainer?.nativeElement?.addEventListener('scroll', () => {
			const el = this.scrollContainer.nativeElement
			// Nếu không ở cuối (ví dụ: cách cuối > 100px), đánh dấu user đã tự cuộn lên
			this.userScrolledUp = el.scrollHeight - el.scrollTop - el.clientHeight > 100
		})
	}

	ngOnDestroy() {
		this._socket.disconnect()
	}

	protected onChangeRoom(room: RoomModel) {
		this.currentRoom = room
		this.payload.fromId = room.shopId
		this.payload.toId = room.userId
		this.payload.roomId = room.roomId
		this._socket.emit('join_room', room.roomId)
		this._chatService.getMess(room.roomId).subscribe((res: MessModel[]) => {
			this.dataMess$.next(res)
			setTimeout(() => this._scrollToBottom(), 50)
		})
	}

	protected onSendMessage() {
		if (this.contentChat.message) {
			this._socket?.emit('send_message', {
				...this.payload,
				type: 'admin',
				content: {
					...this.contentChat
				}
			})
			this.dataMess$.next([
				...this.dataMess$.getValue(),
				{
					from_id: this.payload.fromId,
					room_id: this.payload.roomId, // ép kiểu sang string nếu cần
					to_id: this.payload.toId,
					type: 'admin',
					content: {
						mess: this.contentChat.message,
						type: String(this.contentChat.type)
					},
					createdAt: new Date(),
					updatedAt: new Date()
				}
			])
			setTimeout(() => this._scrollToBottom(), 50)
		}

		this.contentChat.message = ''
	}

	private _scrollToBottom(): void {
		if (this.scrollContainer) {
			console.log(
				this.scrollContainer.nativeElement,
				'this.scrollContainerthis.scrollContainer',
				this.scrollContainer.nativeElement.scrollHeight
			)
			try {
				if (!this.userScrolledUp) {
					this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight
				}
			} catch (err) {
				console.error('Scroll to bottom error:', err)
			}
		}
	}

	private _fetchDataRooms() {
		this._roomService.getRooms().subscribe((data: RoomModel[]) => {
			this.dataRoom$ = of(data)
		})
	}

	private _fetchDataShop() {
		this._accountService.getCurrentInfo().subscribe((data: AccountInfoModel) => {
			this.dataAccount = data
		})
	}
}
