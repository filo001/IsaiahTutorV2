const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')

// add post and get requests here

router.post('/helloworld', async (req, res) => {
    res.send('hello world')
})

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
    users.findOneAndUpdate({name: user}, {lastLoggedIn: Date.now()}, null).exec()
    result.message = JSON.stringify(String(userData))
    result.userObj = userData[0]
    result.auth = true
    res.send(result)
})

router.get('/students', async(req, res) => {
    // AdminStudentView request
    const students = schemas.Users
    const studentData = await students.find({admin: false}).exec()
    if (studentData) {
        res.send(studentData)
    }
})

router.get('/courses', async(req, res) => {
    const courses = schemas.Courses
    const coursesData = await courses.find({}).exec()
    if (coursesData) {
        res.send(coursesData)
    }
})

router.post('/addStudent', async(req, res, next) => {
    const {name, pass, courses} = req.body
    const students = schemas.Users 
    const studentData = await students.find({}).exec()
    const names = studentData.map(student => student.name)
    if (names.includes(name)) {
        res.send({success: false, msg: 'That name already exists!'})
        return
    }
    
    students.create({name: name, pass: pass, courses: courses})

    res.send({success: true, msg: 'User has been added'})
    
})

router.post('/deleteStudent', async(req, res) => {
    const students = schemas.Users
    students.deleteOne({name: req.body.name}).exec()
    res.send(`Student ${req.body.name} deleted!`)
})

module.exports = router