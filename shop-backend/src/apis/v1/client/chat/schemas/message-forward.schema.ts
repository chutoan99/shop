import mongoose, { Schema, Document } from 'mongoose'

export interface IMessageForward extends Document {
	originalMessageId: mongoose.Types.ObjectId
	forwardedBy: mongoose.Types.ObjectId
	forwardedTo: mongoose.Types.ObjectId[]
	forwardedAt: Date
}

const MessageForwardSchema = new Schema<IMessageForward>(
	{
		originalMessageId: {
			type: Schema.Types.ObjectId,
			ref: 'Message',
			required: true
		},
		forwardedBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		forwardedTo: [
			{ type: Schema.Types.ObjectId, ref: 'User', required: true }
		],
		forwardedAt: { type: Date, default: Date.now }
	},
	{ timestamps: true }
)

export default mongoose.model<IMessageForward>(
	'MessageForward',
	MessageForwardSchema
)
