import path from 'path'
import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import socketio from 'socket.io'
import mqtt from 'mqtt'

const app = express()
const server = http.Server(app)
const io = socketio(server)

const client = mqtt.connect('mqtt://test.mosquitto.org')
let currentColor = 'ffffff'

app.set('env', process.env.NODE_ENV || 'development')
app.set('host', process.env.HOST || '0.0.0.0')
app.set('port', process.env.PORT || 5000)

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../../assets')))
app.use('/scripts', express.static(path.join(__dirname, '../../dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../assets', 'index.html'))
})

app.use((err, req, res, next) => {
  console.log('Error on request %s %s', req.method, req.url)
  console.log(err)
  console.log(err.stack)
  res.status(500).send('Internal server error')
})

io.on('connection', (socket) => {
  console.log('Got a new connection from client.')
  socket.emit('color', currentColor)

  const ip = socket.handshake.headers['x-forwarded-for']
  const ua = socket.handshake.headers['user-agent']

  socket.on('color', (data) => {
    const payload = JSON.stringify({
      data: data,
      ip: ip,
      ua: ua
    })

    currentColor = data
    client.publish('bekti_dugem_color', payload)
    io.emit('color', data)
  })

  socket.on('control', (data) => {
    const payload = JSON.stringify({
      data: data,
      ip: ip,
      ua: ua
    })

    client.publish('bekti_dugem_control', payload)
  })
})

server.listen(app.get('port'), () => {
  console.log('Express %s server listening on %s:%s',
    app.get('env'),
    app.get('host'),
    app.get('port')
  )
})
