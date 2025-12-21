import mongoose, { Schema, Document } from 'mongoose'

export interface IMessageThread extends Document {
	participants: mongoose.Types.ObjectId[]
	lastMessageId?: mongoose.Types.ObjectId
}

const MessageThreadSchema = new Schema<IMessageThread>(
	{
		participants: [
			{ type: Schema.Types.ObjectId, ref: 'User', required: true }
		],
		lastMessageId: { type: Schema.Types.ObjectId, ref: 'Message' }
	},
	{ timestamps: true }
)

export default mongoose.model<IMessageThread>(
	'MessageThread',
	MessageThreadSchema
)
