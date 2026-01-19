import express from 'express'
import {
  getLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson
} from '../controllers/lessonController.js'

const router = express.Router()

// CRUD rute
router.get('/', getLessons)         // dohvat svih lekcija
router.get('/:id', getLessonById)   // dohvat jedne lekcije
router.post('/', createLesson)      // kreiranje lekcije (admin)
router.put('/:id', updateLesson)    // update lekcije (admin)
router.delete('/:id', deleteLesson) // brisanje lekcije (admin)

export default router
