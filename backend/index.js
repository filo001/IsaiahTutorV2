// server initialization
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')
    // google drive
    // const fileUpload = require('express-fileupload')
    // const cookieParser = require('cookie-parser')

// database 
const mongoose = require('mongoose')
require('dotenv/config')

// application
const app = express()
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '15mb'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))
    // app.use(fileUpload())  GOOGLE DRIVE
    // app.use(cookieParser())
app.use('/', router)


// database connection
dbOptions = {useNewUrlParser:true, useUnifiedTopology:true}
mongoose.connect(process.env.DB_URI, dbOptions)
.then(() => console.log('DB connected!'))
.catch(error => console.log(error))

// port initialization
const port = process.env.PORT || 4000 
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})