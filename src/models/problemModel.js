import mongoose, { Schema } from 'mongoose'

const problemSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'description is required'],
      lowercase: true,
    },
    image: [
      {
        problemScreenshot: {
          type: String,
        },
      },
    ],
    tags: {
      type: String,
      required: true,
      enum: ['backend', 'frontend', 'mobiledev', 'devops'],
      max: 4,
      min: 1,
    },
    isSolved: {
      type: Boolean,
      default: false,
    },
    postedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

const Problem = mongoose.model('Problem', problemSchema)

export default Problem
