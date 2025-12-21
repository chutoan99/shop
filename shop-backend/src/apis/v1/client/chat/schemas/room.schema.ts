import mongoose from 'mongoose'
const Schema = mongoose.Schema

export interface IRoom {
	userId: number
	shopId: number
	isActive: boolean
	avatar: string
	fileName: string
	lastMessage: string
	metadata: object
	active: boolean
	created_by: number
	deleted_by: number
	updated_by: number
	created_at?: Date // `timestamps: true` will generate these fields
	updatedAt?: Date // `timestamps: true` will generate these fields
}

const roomSchema = new Schema(
	{
		roomId: { type: Number },
		userId: { type: Number },
		shopId: { type: Number },
		avatar: { type: String },
		fileName: { type: String },
		lastMessage: { type: String },
		metadata: { type: Object },
		active: { type: Boolean },
		created_by: { type: Number },
		deleted_by: { type: Number },
		updated_by: { type: Number }
	},
	{ timestamps: true }
)

// const roomSchema = new Schema(
// 	{
// 		type: { type: String, enum: ['private', 'group'], required: true },
// 		target_type: { type: String, enum: ['user', 'shop', null], default: null },
// 		name: { type: String },
// 		avatar: { type: String },
// 		fileName: { type: String },
// 		lastMessage: { type: String },
// 		metadata: { type: Object },
// 		active: { type: Boolean },
// 		created_by: { type: Number },
// 		deleted_by: { type: Number },
// 		updated_by: { type: Number }
// 	},
// 	{ timestamps: true }
// );

const RoomModel = mongoose.model('room', roomSchema)
export default RoomModel
