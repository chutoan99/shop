import mongoose from 'mongoose'
const Schema = mongoose.Schema

const groupSchema = new Schema(
	{
		name: { type: String },
		description: { type: String },
		avatar: { type: String },
		fileName: { type: String },
		lastMessage: { type: String },
		ownerId: { type: Number },
		metadata: { type: Object },
		active: { type: Boolean },
		created_by: { type: Number },
		deleted_by: { type: Number },
		updated_by: { type: Number }
	},
	{ timestamps: true }
)

const GroupModel = mongoose.model('group', groupSchema)
export default GroupModel
