var request = require('request')

var ENDPOINT_CURRENCIES = 'openexchangerates.org/api/currencies.json'
  , ENDPOINT_LATEST     = 'openexchangerates.org/api/latest.json'
  , ENDPOINT_HISTORICAL = 'openexchangerates.org/api/historical/'

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

var DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/

exports.historical = function historical(date, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = undefined
  }
  if (typeof cb !== 'function') {
    throw new Error('Callback not a function')
  }
  if (typeof date === 'string') {
    if (!DATE_REGEX.test(date)) {
      return cb(new Error('date "' + date + '" does not match ' + DATE_REGEX))
    }
  }
  else if (date instanceof Date) {
    var day = date.getDate()
      , month = date.getMonth()
      , year = date.getFullYear()
    if (day < 10) {
      day = '0' + day
    }
    if (month < 10) {
      month = '0' + month
    }
    year = year.toString()
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
    { uri: protocol + ENDPOINT_HISTORICAL + date + '.json'
    , json: true
    }
  if (app_id) {
    requestParams.qs = { app_id: app_id }
  }
  request(requestParams, function (err, res, body) {
    delete body.disclaimer
    delete body.license
    if (err) {
      return cb(err)
    }
    cb(null, body)
  })
}