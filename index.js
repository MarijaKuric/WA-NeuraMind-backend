import express from 'express'
import serverless from 'serverless-http'
import cors from 'cors'
import authRoutes from '../routes/auth.js'  // proveri da je putanja ispravna

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Rute
app.use('/api/auth', authRoutes)

// GET "/" za test
app.get('/', (req, res) => {
  res.status(200).send('Backend radi na rootu!')
})

// Export za Vercel serverless
export default serverless(app)
