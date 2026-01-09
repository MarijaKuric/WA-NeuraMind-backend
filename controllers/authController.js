import User from '../src/models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Neispravni admin podaci' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Neispravni admin podaci' })
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Nemaš admin pristup' })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Greška na serveru' })
  }
}
