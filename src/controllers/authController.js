import apiResponse from 'quick-response'
import User from '../models/userModel.js'

// @desc: login user
// route: POST /api/v1/users/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    if ((email == '' || !email) && (password == '' || !password)) {
      return res.status(400).json(apiResponse(400, 'enter email and password'))
    }

    const userFound = await User.findOne({ email })
    if (!userFound) {
      return res.status(404).json(apiResponse(404, 'user not found'))
    }

    // chesk password is correct or wrong
    const isPasswordCorrect = await userFound.correctPassword(password)
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json(apiResponse(400, 'incorrect email and password'))
    }

    // generate jwt token
    const token = await userFound.generateToken()

    return res.status(200).json(apiResponse(200, 'login successful', { token }))
  } catch (error) {
    return res.status(400).json({ status: 'fail', message: error.message })
  }
}

export { loginUser }
