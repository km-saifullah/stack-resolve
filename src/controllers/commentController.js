import apiResponse from 'quick-response'
import Comment from '../models/commentModel.js'

// @desc:  create a comment
// @route: POST /api/v1/comments
const createComment = async (req, res) => {
  try {
    const { comment, like = 0, dislike = 0, postedBy } = req.body

    if (!comment && comment === '') {
      return res.status(400).json(apiResponse(400, 'please write a comment'))
    }

    const newComment = await Comment.create({
      comment,
      like,
      dislike,
      postedBy,
    })
    return res.status(201).json(apiResponse(201, 'comment posted', newComment))
  } catch (error) {
    return res
      .status(400)
      .json(apiResponse(400, 'server error', { error: error.message }))
  }
}

// @desc:  get all comments
// @route: GET /api/v1/comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).populate(
      'postedBy',
      '-password -createdAt -updatedAt'
    )
    return res.status(200).json(apiResponse(200, 'all comments', comments))
  } catch (error) {
    return res
      .status(400)
      .json(apiResponse(400, 'server error', { error: error.message }))
  }
}

export { createComment, getAllComments }
