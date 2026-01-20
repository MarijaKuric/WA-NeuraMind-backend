import Lesson from '../models/Lesson.js'

// GET: sve lekcije, sortirano po order
export const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ order: 1 })
    res.status(200).json(lessons)
  } catch (err) {
    res.status(500).json({ message: 'Greška pri dohvaćanju lekcija' })
  }
}

// GET: jedna lekcija po ID-u
export const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
    if (!lesson) return res.status(404).json({ message: 'Lekcija nije pronađena' })
    res.status(200).json(lesson)
  } catch (err) {
    res.status(500).json({ message: 'Greška pri dohvaćanju lekcije' })
  }
}

// POST: kreiranje nove lekcije
export const createLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body)
    res.status(201).json(lesson)
  } catch (err) {
    res.status(500).json({ message: 'Greška pri kreiranju lekcije' })
  }
}

// PUT: update lekcije po ID-u
export const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!lesson) return res.status(404).json({ message: 'Lekcija nije pronađena' })
    res.status(200).json(lesson)
  } catch (err) {
    res.status(500).json({ message: 'Greška pri ažuriranju lekcije' })
  }
}

// DELETE: brisanje lekcije po ID-u
export const deleteLesson = async (req, res) => {
  try {
    await Lesson.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Lekcija obrisana' })
  } catch (err) {
    res.status(500).json({ message: 'Greška pri brisanju lekcije' })
  }
}
