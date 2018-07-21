const standardSettings = require('standard-settings')
const settings = standardSettings.getSettings()
const config = require('../config')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var bodyParser = require('body-parser')
var Twitter = require('twitter')

// default port where dev server listens for incoming traffic
var port = settings.server.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = settings.dev.proxyTable

var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// JSON encode
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('body-parser').json())

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(settings.dev.assetsPublicPath, settings.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

server.listen(port, function() {
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
})

let userConnected = false
io.sockets.on('connection', function (socket) {
  userConnected = true
  if(userConnected) {
    console.log('Hello new user')
    var client = new Twitter({
      consumer_key: settings.twitter.consumer_key,
      consumer_secret: settings.twitter.consumer_secret,
      access_token_key: settings.twitter.access_token_key,
      access_token_secret: settings.twitter.access_token_secret
    })
    client.stream('statuses/filter', {track: settings.hashtag}, function(stream) {
      stream.on('data', function(event) {
        console.log(event && event.text)
        io.emit('newTweet', (event))
      })
     
      stream.on('error', function(error) {
        throw error;
      })
    })
  }
  

})
