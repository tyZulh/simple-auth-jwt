const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const userController = require('../controller/userController')

router.post('/', asyncHandler(userController.postOne))

module.exports = router
