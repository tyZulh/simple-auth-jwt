const { UnAuthorizedError } = require("../errors-types")

module.exports = (err, req, res, next) => {
  if(err instanceof UnAuthorizedError) {
    res.status(401).send('Unauthorized')
  } else {
    next(err)
  }
}