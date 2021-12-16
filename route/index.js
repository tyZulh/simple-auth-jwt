const userRouter = require('./userRouter')
const authRouter = require('./authRouter')

const router = (app) => {
  app.use('/users', userRouter)
  app.use('/auth', authRouter)
}


module.exports = { router }