import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { tokenExpires, tokenSecret } from '../config/index.js'

const userSchema = new Schema(
  {
    displayName: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

// hash password
userSchema.pre('save', async function (next) {
  // only run thus function if password was actually modified
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 10)

  next()
})

// check password is correct or not
userSchema.methods.correctPassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password)
}

// generate jwt token
userSchema.methods.generateToken = async function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      displayName: this.displayName,
    },
    tokenSecret,
    { expiresIn: tokenExpires }
  )
}

// jwt token verification
userSchema.methods.verifyToken = async function (token) {
  return jwt.verify(token, tokenSecret, function (err, decoded) {
    if (err) {
      return null
    }
    return decoded
  })
}

const User = mongoose.model('User', userSchema)

export default User
