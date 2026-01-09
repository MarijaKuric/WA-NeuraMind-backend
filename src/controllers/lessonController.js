import Lesson from '../models/Lesson.js'

// GET sve lekcije (filter, sort, pagination)
export const getLessons = async (req, res) => {
  try {

    if (req.query.filter) {
      query = query.find({ naslov: { $regex: req.query.filter, $options: 'i' } })
    }

    query = query.sort({ createdAt: -1 })

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    query = query.skip((page - 1) * limit).limit(limit)

    const lessons = await query
    res.json(lessons)
  } catch (error) {
    res.status(500).json({ message: 'Greška prilikom dohvaćanja lekcija', error })
  }
}

// GET jednu lekciju po ID-u
export const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
    if (!lesson) return res.status(404).json({ message: 'Lekcija nije pronađena' })
    res.json(lesson)
  } catch (error) {
    res.status(500).json({ message: 'Greška prilikom dohvaćanja lekcije', error })
  }
}

// POST - dodaj lekciju
export const createLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body)
    res.status(201).json(lesson)
  } catch (error) {
    res.status(500).json({ message: 'Greška prilikom stvaranja lekcije', error })
  }
}

// PUT/PATCH - update lekcije
export const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!lesson) return res.status(404).json({ message: 'Lekcija nije pronađena' })
    res.json(lesson)
  } catch (error) {
    res.status(500).json({ message: 'Greška prilikom ažuriranja lekcije', error })
  }
}

// DELETE lekcije
export const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id)
    if (!lesson) return res.status(404).json({ message: 'Lekcija nije pronađena' })
    res.json({ message: 'Lekcija obrisana' })
  } catch (error) {
    res.status(500).json({ message: 'Greška prilikom brisanja lekcije', error })
  }
}
