var request = require('request')

var ENDPOINT_CURRENCIES = 'openexchangerates.org/api/currencies.json'
  , ENDPOINT_LATEST     = 'openexchangerates.org/api/latest.json'

var app_id
exports.__defineGetter__('app_id', function () {
  return app_id
})

exports.__defineSetter__('app_id', function (id) {
  app_id = id
})

exports.latest = function latest(opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = undefined
  }

  if (typeof cb !== 'function') {
    throw new Error('Callback not a function')
  }

  opts = opts || {}
  var protocol
  if (opts.https) {
    protocol = 'https://'
  }
  else {
    protocol = 'http://'
  }
  var requestParams =
    { uri: protocol + ENDPOINT_LATEST
    , json: true
    }
  if (app_id) {
    requestParams.qs = { app_id: app_id }
  }
  request(requestParams, function (err, res, body) {
    if (err) {
      return cb(err)
    }
    delete body.license
    delete body.disclaimer
    cb(null, body)
  })
}

exports.currencies = function currencies(opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = undefined
  }

  if (typeof cb !== 'function') {
    throw new Error('Callback not a function')
  }

  opts = opts || {}
  var protocol
  if (opts.https) {
    protocol = 'https://'
  }
  else {
    protocol = 'http://'
  }
  var requestParams =
    { uri: protocol + ENDPOINT_CURRENCIES
    , json: true
    }
  if (app_id) {
    requestParams.qs = { app_id: app_id }
  }
  request(requestParams, function (err, res, body) {
    if (err) {
      return cb(err)
    }
    cb(null, body)
  })
}
