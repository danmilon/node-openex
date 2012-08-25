var should = require('should')
  , openex = require('../')

describe('openex', function () {
  it('should throw when no callback is given', function () {
    openex.latest.should.throw()
    openex.currencies.should.throw()
    openex.historical.should.throw()
  })

  it('should work with the /latest API', function (done) {
    openex.latest(function (err, res) {
      should.ifError(err)
      res.should.be.a('object')
      res.should.have.property('rates')
      res.rates.should.be.a('object')
      res.should.have.property('base')
      res.base.should.equal('USD')
      done()
    })
  })

  it('should work with the /currencies API', function (done) {
    openex.currencies(function (err, res) {
      should.ifError(err)
      res.should.be.a('object')
      res.should.have.property('USD')
      res.USD.should.equal('United States Dollar')
      done()
    })
  })

  it('historical should work with various dates', function (done) {
    function expectsError(err) { err.should.be.instanceof(Error) }
    openex.historical('2010-10-9', expectsError)
    openex.historical('10-10-08', expectsError)
    openex.historical('2010-5-09', expectsError)
    openex.historical('2011-09-05', function (err, res) {
      should.ifError(err)
      res.should.be.a('object')
      res.should.have.property('rates')
      res.rates.should.be.a('object')
      res.should.have.property('base')
      res.base.should.equal('USD')
      done()
    })
  })
})