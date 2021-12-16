const { createOne } = require('../model/userModel')

const postOne = async (req, res) => {
  const user = await createOne(req.body)
  res.status(201).json(user)
}

module.exports = {
  postOne
}
