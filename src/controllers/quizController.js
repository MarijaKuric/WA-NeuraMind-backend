import Quiz from '../models/Quiz.js'

// GET sve
export const getQuizzes = async (req, res) => {
  const quizzes = await Quiz.find().sort({ createdAt: -1 })
  res.json(quizzes)
}

// GET jednu
export const getQuizById = async (req, res) => {
  const quiz = await Quiz.findById(req.params.id)
  res.json(quiz)
}

// POST
export const createQuiz = async (req, res) => {
  const quiz = await Quiz.create(req.body)
  res.status(201).json(quiz)
}

// PUT
export const updateQuiz = async (req, res) => {
  const quiz = await Quiz.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.json(quiz)
}

// DELETE
export const deleteQuiz = async (req, res) => {
  await Quiz.findByIdAndDelete(req.params.id)
  res.json({ message: 'Kviz obrisan' })
}
