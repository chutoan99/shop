import mongoose, { Schema, Document } from 'mongoose'

export interface IMessageRead extends Document {
	messageId: mongoose.Types.ObjectId
	userId: mongoose.Types.ObjectId
	readAt: Date
}

const MessageReadSchema = new Schema<IMessageRead>(
	{
		messageId: {
			type: Schema.Types.ObjectId,
			ref: 'Message',
			required: true
		},
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		readAt: { type: Date, default: Date.now }
	},
	{ timestamps: true }
)

export default mongoose.model<IMessageRead>('MessageRead', MessageReadSchema)
