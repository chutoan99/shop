import mongoose from 'mongoose'
const Schema = mongoose.Schema

const reactionSchema = new Schema(
	{
		message_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'chat',
			required: true
		},
		user_id: { type: Number, required: true }, // MySQL user id
		reaction: { type: String, required: true }
	},
	{ timestamps: true }
)

const ReactionModel = mongoose.model('reaction', reactionSchema)
export default ReactionModel
