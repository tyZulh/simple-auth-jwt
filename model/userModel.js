const argon = require('argon2');
const mysql = require('../db');
const { RecordNotFoundError } = require('../errors-types');

const createOne = async (body) => {
  body.password = await hashPassword(body.password)
  const [res] = await mysql.query('INSERT INTO user SET ?', [body])
  const [user] = await findOneById(res.insertId)
  return user
}

const findOneById = async (id) => {
  const [user] = await mysql.query('SELECT id, userName, email  FROM user WHERE id = ?', [id]);
  if (!user.length) {
    throw new RecordNotFoundError()
  }
  return user
}

const findOneByEmail = async (email) => {
  const [user] = await mysql.query('SELECT * From user WHERE email = ?', [email])
  if (!user.length) {
    throw new RecordNotFoundError()
  }
  return user
}

const hashPassword = async (password) => {
  try {
    const pass = await argon.hash(password)
    return pass
  } catch (err) {
    throw new Error(err.message)
  }
}

module.exports = {
  createOne,
  findOneByEmail
}
