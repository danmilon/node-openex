# openex +[![build status](https://secure.travis-ci.org/danmilon/node-openex.png)](http://travis-ci.org/danmilon/node-openex)

Openex is a simple client for the API provided by [openexchangerates.org](http://openexchangerates.org). Check their [documentation](http://openexchangerates.org/documentation) to see what key/values each API call should return.

## Install

```
npm install openex
```

## Features

* Support for the /latest API
* Support for the /currencies API
* Can provide app_id

## API

```javascript
var openex = require('openex')
```

### openex.app_id

If `openex.app_id` is set, it will be included in the API calls. For example, using https requires a paid app_id. Eg `openex.app_id = 'deadbeef'.

### openex.latest([options], cb)

Queries the /latest API and then calls function cb(err, res) with the results.
(disclaimer and license feel unnecessery and are removed from the returned object)

### openex.currencies([options], cb)

Queries the /currencies API and then calls function cb(err, res) with the results.

### openex.historical(date, [options], cb)

Queries the /historical API with the date provided and calls cb(err, res) with the results

* **date**: instance of Date, or string formatted 'YYYY-mm-dd'. Example: '2011-04-16'

### options

* `https` Use https when calling the API. Default: false


## Example

```javascript
var openex = require('openex')

openex.latest(function (err, res) {
  if (err) {
    console.error(err)
    process.exit()
  }
  console.log('1 USD = ' + res.rates.EUR + ' EUR')
})
```

## Tests

```
npm test
```

## TODO

* Include usage examples

Feedback, pull requests always welcome.

## License

(The MIT License)

Copyright (c) 2011-2012 Dan Milon <danmilon@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
