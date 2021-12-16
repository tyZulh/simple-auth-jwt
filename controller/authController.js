const argon = require('argon2')
const jwt = require('jsonwebtoken')
const { UnAuthorizedError } = require('../errors-types')
const { findOneByEmail } = require('../model/userModel')


const logIn = async (req, res) => {
  const [user] = await findOneByEmail(req.body.email)
  const isValid = await verifyHash(user.password, req.body.password)
  if (isValid) {
    const token = createToken(user)
    res.status(200).json(token)
  } else {
    throw new UnAuthorizedError()
  }
}

const verifyHash = async (hash, password) => {
  try {
    if(await argon.verify(hash, password)) {
      return true
    } else {
      return false
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

const createToken = (body) => {
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: {
      id: body.id,
      name: body.username
    }
  }, "secret", { algorithm: 'HS256' })

  return token
}

module.exports = {
  logIn
}