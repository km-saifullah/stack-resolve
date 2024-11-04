import apiResponse from 'quick-response'
import fs from 'fs'
import path from 'path'
import Problem from '../models/problemModel.js'
import { fileURLToPath } from 'url'

// get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// @desc:  create a problem
// @route: POST /api/v1/problems
const addProblem = async (req, res) => {
  try {
    const { title, description, tags, postedBy } = req.body
    const images = req.files

    // check for required fields
    if (
      (!title || title === '') &&
      (!description || description === '') &&
      (!tags || tags === '')
    ) {
      return res.status(400).json(apiResponse(400, 'enter required fields'))
    }

    // limit tags to a maximum of 5
    const tagsArray = tags.split(',')
    if (tagsArray.length > 5) {
      return res
        .status(400)
        .json(apiResponse(400, 'maximum 5 tags are allowed'))
    }

    // check the image upload limit
    if (images.length > 4) {
      // delete the temporarily uploaded files
      for (let file of images) {
        fs.unlink(file.path, (err) => {
          if (err)
            console.error(`Error deleting file ${file.path}: ${err.message}`)
        })
      }
      return res
        .status(400)
        .json(apiResponse(400, 'maximum 4 images are allowed'))
    }

    // create a new problem instance
    const problem = new Problem({
      title,
      description,
      tags: tagsArray,
      postedBy,
      image: images.map((img) => ({ problemScreenshot: img.path })),
    })

    await problem.save()

    return res.status(201).json(apiResponse(201, 'problem created', problem))
  } catch (error) {
    return res.status(400).json({ status: 'fail', message: error.message })
  }
}

// @desc:  get all problems
// @route: GET /api/v1/problems
const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find({}).populate('postedBy')

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

// @desc:  get a problem by id
// @route: GET /api/v1/problems/:id
const getProblem = async (req, res) => {
  try {
    const { id } = req.params
    const problem = await Problem.findById({ _id: id }).populate('postedBy')
    if (!problem) {
      return res.status(404).json(apiResponse(404, 'problem does not found'))
    }
    return res.status(200).json(apiResponse(200, 'problem fetched', problem))
  } catch (error) {
    return res.status(400).json({ status: 'fail', message: error.message })
  }
}

// @desc:  delete a problem by id
// @route: DELETE /api/v1/problems/:id
const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params
    const problem = await Problem.findById({ _id: id })
    if (!problem) {
      return res.sattus(404).json(apiResponse(404, 'problem does not found'))
    }

    // delete each image from the file system
    for (let image of problem.image) {
      // navigate to the project root and then to public/temp
      const imagePath = path.join(
        __dirname,
        '../../public/temp',
        path.basename(image.problemScreenshot)
      )

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Failed to delete image at ${imagePath}:`, err.message)
        }
      })
    }

    await Problem.findByIdAndDelete(id)

    return res
      .status(200)
      .json(apiResponse(200, 'Problem deleted successfully'))
  } catch (error) {
    return res.status(400).json({ status: 'fail', message: error.message })
  }
}

export { addProblem, getAllProblems, getProblem, deleteProblem }
