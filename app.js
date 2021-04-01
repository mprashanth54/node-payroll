const express = require('express')
const db = require('./db')
const cors = require('cors')
const AuthService = require('./services/auth')
const app = express()

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.use('/api/auth', require('./controllers/auth'))
app.use('/api/organization', AuthService.verifyTokenForRefresh, require('./controllers/organization'))
app.use('/api/deductions', AuthService.verifyTokenForRefresh, require('./controllers/deductions'))
app.use('/api/employees', AuthService.verifyTokenForRefresh, require('./controllers/employees'))

module.exports = app