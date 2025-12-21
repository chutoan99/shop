import mongoose from 'mongoose'
const Schema = mongoose.Schema

const chatSchema = new Schema(
	{
		room_id: { type: String },
		from_id: { type: Number },
		to_id: { type: Number },
		type: { type: String },
		content: {
			mess: { type: String },
			type: { type: String, default: 'mess' }
		},
		created_by: { type: Number },
		deleted_by: { type: Number },
		updated_by: { type: Number }
	},
	{ timestamps: true }
)

// const chatSchema = new Schema(
// 	{
// 		room_id: { type: mongoose.Schema.Types.ObjectId, ref: 'room', required: true },
// 		from_id: { type: Number, required: true }, // MySQL user id
// 		type: { type: String, enum: ['text', 'image', 'file', 'video'], default: 'text' },
// 		content: {
// 			text: { type: String },
// 			file_url: { type: String },
// 			file_name: { type: String }
// 		}
// 	},
// 	{ timestamps: true }
// );

const ChatModel = mongoose.model('chat', chatSchema)
export default ChatModel
