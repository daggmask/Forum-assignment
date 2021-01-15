const express = require('express')
const app = express()
const session = require('express-session')
const store = require('better-express-store')

const RestApi = require('./src/server/RestApi.js')
const ACL = require('./src/server/ACL.js')
const ACLsettings = require('./src/server/ACLsettings.js')

//Make Express able to read the req.body
//Set app.use in order of rendering, i.e session before ACL due too session check in ACL
app.use(express.json())


app.use(session({
  secret: require('./src/server/session-secret.json'),
  resave: false,
  saveUninitialized: true,
  cookie: {secure: 'auto'},
  store: store({dbPath: './src/server/forum.db'})
}))

app.use(ACL(ACLsettings))
//Start webserver
app.listen(3001, () => {console.log('Listening on port 3001');})

new RestApi(app)
