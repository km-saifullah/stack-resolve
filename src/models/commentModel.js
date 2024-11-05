import mongoose, { Schema } from 'mongoose'

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    postedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    postedDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
)

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
