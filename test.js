var openex = require('./lib/openex')

openex.api_key = 

openex.currencies({ https: true }, function (err, res) {
  console.log(err, res)
})