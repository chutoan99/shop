import mongoose from 'mongoose'
const Schema = mongoose.Schema

const roomMemberSchema = new Schema(
	{
		room_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'room',
			required: true
		},
		user_id: { type: Number, required: true }, // MySQL user id
		role: { type: String, enum: ['member', 'admin'], default: 'member' },
		joined_at: { type: Date, default: Date.now },
		left_at: { type: Date, default: null }
	},
	{ timestamps: true }
)

const RoomMemberModel = mongoose.model('room_member', roomMemberSchema)
export default RoomMemberModel
