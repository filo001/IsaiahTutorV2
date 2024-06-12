const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')

// add post and get requests here

router.post('/auth', async (req, res) => {
    const {user, pass} = req.body
    const result = {message: '', auth: false, userObj: undefined}
    const users = schemas.Users
    const userData = await users.find({ name: user }).exec()
    if (userData[0] === undefined) {
        result.message = "ERROR, USER NOT FOUND"
        res.send(result)
        return
    }
    // There is a valid entry
    if (userData[0].pass != pass) {
        result.message = "ERROR, PASSWORD INVALID"
        res.send(result)
        return
    }
    // There is a valid entry and the password is the correct one
    users.findOneAndUpdate({name: user}, {lastLoggedIn: (new Date).toLocaleString()}, null).exec()
    result.message = JSON.stringify(String(userData))
    result.userObj = userData[0]
    result.auth = true
    res.send(result)
})

router.get('/students', async(req, res) => {
    const students = schemas.Users
    const studentData = await students.find({admin: false}).exec()
    if (studentData) {
        res.send(studentData)
    }
})


module.exports = router