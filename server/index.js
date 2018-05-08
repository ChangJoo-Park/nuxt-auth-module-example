
const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const jwt = require('express-jwt')
const jsonwebtoken = require('jsonwebtoken')

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  app.use(bodyParser.json())
  app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body

    const valid = username.length && password === '123'

    if (!valid) {
      throw new Error('Invalid username or password')
    }

    const accessToken = jsonwebtoken.sign({ username }, 'dummy')

    res.json({ token: accessToken })
  })

  app.post('/api/auth/logout', (req, res, next) => {
    res.json({ status: 'OK' })
  })
  app.get('/api/auth/user', jwt({secret: 'dummy'}), (req, res, next) => {
    res.json({ user: req.user })
  })
  // Give nuxt middleware to express
  app.use(nuxt.render)

  app.use((err, req, res, next) => {
    console.error(err) // eslint-disable-line no-console
    res.status(401).send(err + '')
  })
  // Listen the server
  app.listen(port, host)
  console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
}
start()
