const jsonServer = require('json-server')

const port = 4000

const server = jsonServer.create()

// connect db
const router = jsonServer.router('./db.json')

// static host client
const middlewares = jsonServer.defaults({
  static: './client'
})

//hack
middlewares[4] = function(req, res, next) {
  res.header('Cache-Control', 'private, max-age=120')
  res.header('Expires', new Date(Date.now() + 120000).toGMTString())
  next()
}
server.set('etag', false)

server.use(middlewares)

server.use(router)

server.listen(port, function() {
  console.log(`JSON Server is running on port ${port}`)
})
