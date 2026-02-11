import mongoose from 'mongoose'

const objavaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Korisnik',
    required: true
  },
  ime: String,
  text: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

export default mongoose.model('Objava', objavaSchema)
