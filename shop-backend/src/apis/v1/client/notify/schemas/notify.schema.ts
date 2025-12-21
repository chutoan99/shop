import mongoose from 'mongoose'
const Schema = mongoose.Schema

const notifySchema = new Schema(
	{
		userId: { type: String },
		image: { type: String },
		title: { type: String },
		content: { type: String },
		seen: { type: Boolean }
	},
	{ timestamps: true, versionKey: false }
)

const NotifyModel = mongoose.model('notify', notifySchema)
export default NotifyModel
