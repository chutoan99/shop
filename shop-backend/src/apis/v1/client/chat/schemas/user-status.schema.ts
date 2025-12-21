import mongoose, { Schema, Document } from 'mongoose'

export interface IUserStatus extends Document {
	userId: mongoose.Types.ObjectId
	status: 'online' | 'offline' | 'away' | 'busy'
	lastActive: Date
}

const UserStatusSchema = new Schema<IUserStatus>(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		status: {
			type: String,
			enum: ['online', 'offline', 'away', 'busy'],
			default: 'offline'
		},
		lastActive: { type: Date, default: Date.now }
	},
	{ timestamps: true }
)

export default mongoose.model<IUserStatus>('UserStatus', UserStatusSchema)
