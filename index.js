const jsonServer = require('json-server')

const port = 4000

const server = jsonServer.create()

// connect db
const router = jsonServer.router('./data/db.json')

// static host client
const middlewares = jsonServer.defaults({
  static: './client'
})

//hack
middlewares[4] = function(req, res, next) {
  res.header('Cache-Control', 'public, max-age=120')
  // res.header('Pragma', 'no-cache');
  res.header('Expires', new Date(Date.now() + 120000))
  next()
}
server.set('etag', false)

server.use(middlewares)

server.use(router)

server.listen(port, function() {
  console.log(`JSON Server is running on port ${port}`)
})