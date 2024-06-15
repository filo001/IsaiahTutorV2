const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')
// Dropbox initialization
require('dotenv/config')
const fetch = require('node-fetch')
const { Dropbox } = require('dropbox')

const dbx = new Dropbox({ accessToken: process.env.DBX_TOKEN, fetch: fetch})


// add post and get requests here

router.get('/test2', async (req, res) => {
    res.send(String(process.env.DBX_TOKEN))
})


router.get('/', async (req, res) => {
    res.send({message: "Hello world!"})
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

router.get('/lessons', async(req, res) => {
    const lessons = schemas.Lessons
    const lessonsData = await lessons.find({}).exec()
    console.log('Lessons fetched')
    res.send(lessonsData)
})

router.post('/createLink', async(req, res) => {
    const path = Object.keys(req.body)[0]

    const fileData = await dbx.sharingCreateSharedLinkWithSettings({
        path: path,
        settings: {
            requested_visibility: 'public'
        }
    }) 
    console.log(`File created at ${path}`)
    console.log(fileData.status)
    const directLink = fileData.result.url.replace('dl=0', 'raw=1')
    console.log(`Link ${directLink}`)
    res.send(directLink)
})

router.post('/addLesson', async(req, res) => {
    const {name, topic, homework, course, embed, lessonID} = req.body
    console.log(`LessonID: ${lessonID} Link: ${embed}`)
    const lessonsSchema = schemas.Lessons
    const courses = schemas.Courses
    const currentCourse = await courses.find({name: course}).exec()
    const currentLessons = currentCourse[0].lessons
    courses.findOneAndUpdate({name: course}, {lessons: [...currentLessons, {name: name, lessonID: lessonID}]}, null).exec()
    lessonsSchema.create({name: name, topic: topic, homework: homework, embed: embed, lessonID: lessonID})
    res.send(`${name} has been added to the lessons database at ${(new Date).toLocaleTimeString()}`)

})

router.get('/checkStatus', async(req, res) => {
    try {
        await dbx.filesGetMetadata({path: '/test.txt',
            include_media_info: false,
            include_deleted: false,
            include_has_explicit_shared_members: false
        })
        res.send({msg: `App is online, last updated at ${(new Date).toLocaleTimeString()}`, variant: 'success'})
    }
    catch (error) {
        res.send({msg: `Dropbox API is offline (file uploads not possible now) but backend is working, last updated at ${(new Date).toLocaleTimeString()}`, variant: 'danger'})
        console.log(error)
    }

    
})

module.exports = router