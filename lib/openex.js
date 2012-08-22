var request = require('request')

var ENDPOINT_CURRENCIES = 'openexchangerates.org/api/currencies.json'
  , ENDPOINT_LATEST     = 'openexchangerates.org/api/latest.json'

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
  request({
    uri: protocol + ENDPOINT_LATEST
  , json: true
  }, function (err, res, body) {
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
  request({
    uri: protocol + ENDPOINT_CURRENCIES
  , json: true
  }, function (err, res, body) {
    if (err) {
      return cb(err)
    }
    cb(null, body)
  })
}
