const { RecordNotFoundError } = require("../errors-types")

module.exports = (err, req, res, next) => {
  if(err instanceof RecordNotFoundError) {
    res.status(404).send('A record was not found for this request')
  } else {
    next(err)
  }
}