class RecordNotFoundError extends Error {}
class BadRequestError extends Error {}
class UnAuthorizedError extends Error {}


module.exports = {
  RecordNotFoundError,
  BadRequestError, UnAuthorizedError
}