const express = require('express')
const app = express()
const session = require('express-session')
const store = require('better-express-store')


const RestApi = require('./RestApi')
const ACL = require('./ACL')
const ACLsettings = require('./ACLsettings')

//Make Express able to read the req.body
//Set app.use in order of rendering, i.e session before ACL due too session check in ACL
app.use(express.json())


app.use(session({
  secret: require('../session-secret.json'),
  resave: false,
  saveUninitialized: true,
  cookie: {secure: 'auto'},
  store: store({dbPath: './Forum.db'})
}))

app.use(ACL(ACLsettings))
//Start webserver
app.listen(3000, () => {console.log('Listening on port 3000');})

new RestApi(app)
