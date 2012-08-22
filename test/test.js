var should = require('should')
  , openex = require('../')

describe('openex', function () {
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
})