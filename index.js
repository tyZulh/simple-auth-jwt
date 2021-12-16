require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { router } = require('./route')
const handleRecordNotFound = require('./middleware/handleRecordNotFound')
const handleBadRequest = require('./middleware/handleBadRequest')
const handleInternalServer = require('./middleware/handleInternalServerError');
const handleUnAuthorizedError = require('./middleware/handleUnAuthorizedError');

const PORT = process.env.PORT

const app = express()

app.use(cors('*'))
app.use(express.json())

router(app)

app.use(handleBadRequest)
app.use(handleRecordNotFound)
app.use(handleUnAuthorizedError)
app.use(handleInternalServer)

app.listen(PORT, () => {
  console.log(`Server up & running on : ${PORT}`)
})