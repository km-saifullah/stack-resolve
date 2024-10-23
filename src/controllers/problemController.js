import Problem from '../models/problemModel.js'

// @desc:  create a problem
// @route: POST /api/v1/problems
const addProblem = async (req, res) => {
  try {
    return res.send('ok')
  } catch (error) {
    return res.status(400).json({ status: 'fail', message: error.message })
  }
}

const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find({})

    return res.status(200).json({
      status: 'success',
      message: 'all problem fetched successfully',
      data: problems,
      results: problems.length,
    })
  } catch (error) {
    return res.status(400).json({ status: 'fail', message: error.message })
  }
}

export { addProblem, getAllProblems }
