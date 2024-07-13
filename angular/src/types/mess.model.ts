export interface MessModel {
	content: { mess: any; type: 'mess' }
	createdAt: string
	from_id: number
	from_user_name: string
	id: string
	room_id: number
	to_id: number
	to_user_name: string
	updatedAt: string
}
