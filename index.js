var express = require('express')
var app = express()
var client = require('redis').createClient({
            host: '10.100.181.26',
            port: 6379
        });
 
var limiter = require('express-limiter')(app, client)
 
/**
 * you may also pass it an Express 4.0 `Router`
 *
 * router = express.Router()
 * limiter = require('express-limiter')(router, client)
 */
 
limiter({
  path: '/dockets-limit/:key',
  method: 'get',
  lookup: ['params.key'],
  // 2 requests per second
  total: 10,
  expire: 1000 * 10 * 1,
  onRateLimited: function (request, response, next) {
	  response.status(429).json('Rate limit exceeded');
  }
})
 
app.get('/dockets-limit/:key', function (req, res) {
  res.status(200).json('ok');
})

app.listen(7777);
