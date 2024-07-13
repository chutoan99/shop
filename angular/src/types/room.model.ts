import { UserInfor } from './user.model'

export interface Room {
	roomid: number
	shopid: number
	userid: any
	createdAt: string
	updatedAt: string
	user_info: UserInfor
}
