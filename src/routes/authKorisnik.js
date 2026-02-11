import express from 'express'
import bcrypt from 'bcryptjs'
import Korisnik from '../models/Korisnik.js'
import sendEmail from '../utils/sendEmail.js'

const router = express.Router()

// ================= REGISTER =================
router.post('/register', async (req, res) => {
  const { ime, prezime, email, lozinka } = req.body

  try {
    const postoji = await Korisnik.findOne({ email })
    if (postoji) {
      return res.status(400).json({ message: 'Email već postoji' })
    }

    const hashed = await bcrypt.hash(lozinka, 10)

    const korisnik = await Korisnik.create({
      ime,
      prezime,
      email,
      lozinka: hashed
    })

    try {
      await sendEmail(
        email,
        'Dobrodošli u NEURAMind',
        `<h3>Registracija uspješna 🎉</h3>
         <p>Vaš korisnički račun je uspješno kreiran.</p>`
      )
    } catch (mailErr) {
      console.error('Email nije poslan:', mailErr.message)
    }

    res.status(201).json({
      message: 'Korisnik registriran',
      userId: korisnik._id
    })

  } catch (err) {
    console.error('Greška pri registraciji:', err)
    res.status(500).json({ message: 'Greška na serveru' })
  }
})


// ================= LOGIN =================
router.post('/login', async (req, res) => {
  const { email, lozinka } = req.body

  try {
    const korisnik = await Korisnik.findOne({ email })
    if (!korisnik) {
      return res.status(400).json({ message: 'Korisnik ne postoji' })
    }

    const isMatch = await bcrypt.compare(lozinka, korisnik.lozinka)
    if (!isMatch) {
      return res.status(400).json({ message: 'Pogrešna lozinka' })
    }

    res.status(200).json({
      message: 'Prijava uspješna',
      korisnik: {
        id: korisnik._id,
        ime: korisnik.ime,
        prezime: korisnik.prezime,
        email: korisnik.email
      }
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Greška na serveru' })
  }
})

export default router
