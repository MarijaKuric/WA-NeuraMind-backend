import express from 'express'
import Objava from '../models/Objava.js'

const router = express.Router()

// GET sve objave
router.get('/', async (req, res) => {
  const objave = await Objava.find().sort({ createdAt: -1 })
  res.json(objave)
})

// POST nova objava
router.post('/', async (req, res) => {
  const { userId, ime, text } = req.body

  const objava = await Objava.create({
    userId,
    ime,
    text
  })

  res.status(201).json(objava)
})

// LIKE
router.put('/like/:id', async (req, res) => {
  const objava = await Objava.findById(req.params.id)
  objava.likes++
  await objava.save()
  res.json(objava)
})

// DELETE
router.delete('/:id', async (req, res) => {
  await Objava.findByIdAndDelete(req.params.id)
  res.json({ message: 'Objava obrisana' })
})

export default router
