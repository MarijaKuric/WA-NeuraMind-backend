import express from 'express'
import bcrypt from 'bcryptjs'
import Korisnik from '../models/Korisnik.js'
// import sendEmail from '../utils/sendEmail.js' // 🎯 Može se uključiti kasnije za email potvrdu

const router = express.Router()

// REGISTRACIJA KORISNIKA
router.post('/register', async (req, res) => {
  const { ime, prezime, email, lozinka } = req.body

  try {
    // Provjera postoji li već korisnik s tim emailom
    const postoji = await Korisnik.findOne({ email })
    if (postoji) {
      return res.status(400).json({ message: 'Email već postoji' })
    }

    // Hash lozinke
    const hashed = await bcrypt.hash(lozinka, 10)

    // Kreiranje novog korisnika
    const noviKorisnik = await Korisnik.create({
      ime,
      prezime,
      email,
      lozinka: hashed,
    })

    console.log('📌 Novi korisnik spremljen u bazi:', noviKorisnik)

    // 🎯 Slanje emaila (trenutno zakomentirano)
    /*
    await sendEmail(
      email,
      'Dobrodošli u NEURAMind',
      `<h3>Registracija uspješna 🎉</h3>
       <p>Vaš korisnički račun je uspješno kreiran.</p>`
    )
    */

    res.status(201).json({ message: 'Korisnik registriran' })
  } catch (err) {
    console.error('❌ Greška pri registraciji:', err)
    res.status(500).json({ message: 'Greška na serveru' })
  }
})

export default router
