import Lesson from '../models/Lesson.js'

// GET sve
export const getLessons = async (req, res) => {
  const lessons = await Lesson.find().sort({ createdAt: -1 })
  res.json(lessons)
}

// GET jednu lekciju
export const getLessonById = async (req, res) => {
  const lesson = await Lesson.findById(req.params.id)
  res.json(lesson)
}

// POST
export const createLesson = async (req, res) => {
  const lesson = await Lesson.create(req.body)
  res.status(201).json(lesson)
}

// PUT
export const updateLesson = async (req, res) => {
  const lesson = await Lesson.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.json(lesson)
}

// DELETE
export const deleteLesson = async (req, res) => {
  await Lesson.findByIdAndDelete(req.params.id)
  res.json({ message: 'Lekcija obrisana' })
}
