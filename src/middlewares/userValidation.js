import apiResponse from 'quick-response'

const createUserValidation = async (req, res, next) => {
  try {
    const { displayName, email, password } = req.body
    if (
      (!displayName || displayName === '') &&
      (!email || email === '') &&
      (!password || password === '')
    ) {
      return res.status(404).json(apiResponse(404, 'all fields are required'))
    }
  } catch (error) {
    return res.status(400).json()
  }
  next()
}

export { createUserValidation }
