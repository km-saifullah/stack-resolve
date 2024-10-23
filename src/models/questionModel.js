import mongoose, { Schema } from 'mongoose'

const questionSchema = new Schema({
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
})

const Question = mongoose.model('Question', questionSchema)

export default Question
