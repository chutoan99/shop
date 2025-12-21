import mongoose, { Schema, Document } from 'mongoose'

export interface IUserSettings extends Document {
	userId: mongoose.Types.ObjectId
	language: string
	theme: 'light' | 'dark'
	notificationsEnabled: boolean
}

const UserSettingsSchema = new Schema<IUserSettings>(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		language: { type: String, default: 'en' },
		theme: { type: String, enum: ['light', 'dark'], default: 'light' },
		notificationsEnabled: { type: Boolean, default: true }
	},
	{ timestamps: true }
)

export default mongoose.model<IUserSettings>('UserSettings', UserSettingsSchema)
