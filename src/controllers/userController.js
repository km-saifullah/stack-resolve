import apiResponse from 'quick-response'
import User from '../models/userModel.js'

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, role } = req.body

    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json(apiResponse(400, 'user already exist'))
    }

    const newUser = await User.create({
      displayName,
      email,
      password,
      role: role ? role : 'user',
    })

    return res
      .status(201)
      .json(apiResponse(201, 'user created successfully', { newUser }))
  } catch (error) {
    return res
      .status(400)
      .json(apiResponse(400, 'fail', { error: error.message }))
  }
}

export { createUser }
