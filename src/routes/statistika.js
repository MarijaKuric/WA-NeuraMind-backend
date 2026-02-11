import express from 'express'
import Statistika from '../models/Statistika.js'

const router = express.Router()

// SPREMI STATISTIKU
router.post('/', async (req, res) => {
  const { userId, correct, total } = req.body

  try {
    const percentage = Math.round((correct / total) * 100)

    const novaStat = await Statistika.create({
      userId,
      correct,
      total,
      percentage
    })

    res.status(201).json(novaStat)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Greška pri spremanju statistike' })
  }
})

// DOHVATI STATISTIKU ZA KORISNIKA
router.get('/:userId', async (req, res) => {
  try {
    const stats = await Statistika.find({ userId: req.params.userId })

    const totalKvizova = stats.length
    const totalTocnih = stats.reduce((sum, s) => sum + s.correct, 0)
    const totalPitanja = stats.reduce((sum, s) => sum + s.total, 0)
    const prosjek = totalKvizova
      ? Math.round(stats.reduce((sum, s) => sum + s.percentage, 0) / totalKvizova)
      : 0

    res.json({
      totalKvizova,
      totalTocnih,
      totalPitanja,
      prosjek
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Greška pri dohvaćanju statistike' })
  }
})

export default router
