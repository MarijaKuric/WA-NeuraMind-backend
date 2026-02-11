import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import authRoutes from './routes/auth.routes.js'       // ADMIN
import authKorisnikRoutes from './routes/authKorisnik.js' // KORISNIK
import lessonRoutes from './routes/lesson.routes.js'
import quizRoutes from './routes/quiz.routes.js'
import statistikaRoutes from './routes/statistika.js'
import zajednicaRoutes from './routes/zajednicaRoutes.js'

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

// ADMIN
app.use('/api/auth', authRoutes)

// KORISNICI
app.use('/api/korisnici', authKorisnikRoutes)

// OSTALO
app.use('/api/lessons', lessonRoutes)
app.use('/api/quizzes', quizRoutes)
app.use('/api/statistika', statistikaRoutes)
app.use('/api/zajednica', zajednicaRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
)
