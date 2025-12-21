import mongoose from 'mongoose'
const Schema = mongoose.Schema

const attachmentSchema = new Schema(
	{
		message_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'chat',
			required: true
		},
		file_url: { type: String, required: true },
		file_name: { type: String },
		file_type: { type: String },
		file_size: { type: Number }
	},
	{ timestamps: true }
)

const AttachmentModel = mongoose.model('attachment', attachmentSchema)
export default AttachmentModel
