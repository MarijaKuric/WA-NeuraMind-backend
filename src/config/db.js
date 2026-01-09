import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB Atlas povezan')
  } catch (error) {
    console.error('❌ MongoDB error:', error.message)
    process.exit(1)
  }
}

export default connectDB
