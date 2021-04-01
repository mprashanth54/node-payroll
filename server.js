const app = require('./app')
require('dotenv').config()

app.listen(process.env.PORT, 'localhost', (err, res) => {
    console.log('Server started in port 3000')
})