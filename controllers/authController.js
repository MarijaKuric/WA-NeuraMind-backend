import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const generateToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )

export const registerUser = async (req, res) => {
  const { email, password } = req.body

  const userExists = await User.findOne({ email })
  if (userExists) {
    return res.status(400).json({ message: 'Korisnik već postoji' })
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    email,
    password: hashedPassword
  })

  res.status(201).json({
    id: user._id,
    email: user.email,
    role: user.role
  })
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(401).json({ message: 'Neispravni podaci' })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(401).json({ message: 'Neispravni podaci' })
  }

  res.json({
    token: generateToken(user),
    user: {
      id: user._id,
      email: user.email,
      role: user.role
    }
  })
}

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Nemaš admin pristup' })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(401).json({ message: 'Neispravni podaci' })
  }

  res.json({
    token: generateToken(user)
  })
}
