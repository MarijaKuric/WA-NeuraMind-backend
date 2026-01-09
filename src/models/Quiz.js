import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true
    },
    options: {
      type: [String],
      required: true
    },
    correct: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

export default mongoose.model('Quiz', quizSchema)
