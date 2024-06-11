// server initialization
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')

// database 
// TODO : LINK DATABASE

// application
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use('/', router)

// port initialization
const port = process.env.PORT || 4000 
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})