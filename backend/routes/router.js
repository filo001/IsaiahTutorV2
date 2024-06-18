const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')

                // // Google drive API TEST

                // const { google } = require('googleapis')
                // const fs = require('fs')
                // const path = require('path')

                //     // all env vars

                // const oauth2Client = new google.auth.OAuth2(
                //     CLIENT_ID,
                //     CLIENT_SECRET,
                //     REDIRECT_URI
                //   )

                // const drive = google.drive({ version: 'v3', auth: oauth2Client })

                // router.get('/googleAuth', async (req, res) => {
                //     const authUrl = oauth2Client.generateAuthUrl({
                //         access_type: 'offline',
                //         scope: ['https://www.'],
                //       })
                //       res.redirect(authUrl)
                // })

                // router.get('/oauth2callback', async (req, res) => {
                //     const code = req.query.code;
                //     const { tokens } = await oauth2Client.getToken(code);
                //     oauth2Client.setCredentials(tokens)
                
                //     // Store tokens in cookies
                //     res.cookie('access_token', tokens.access_token, { httpOnly: true })
                //     res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true })
                //     console.log('Authenticated Google Services')
                //     res.redirect('http:///') // redirect to home page
                //   })


                // router.post('/upload', async(req, res) => {
                //     console.log(req.files)
                //     const file = req.files.file
                //     const filePath = path.join(__dirname, file.name)
                //     console.log('uploading...')
                //     console.log(req.files.file)

                //     await file.mv(filePath)
                //     const accessToken = req.cookies.access_token
                //     const refreshToken = req.cookies.refresh_token
                //     oauth2Client.setCredentials({ access_token: accessToken, refresh_token: refreshToken })
                //     console.log('credentials set')
                //     const response = await drive.files.create({
                //         requestBody: {
                //           name: file.name, // Change file name here
                //           mimeType: file.mimetype,
                //           parents: ['']
                //         },
                //         media: {
                //           mimeType: file.mimetype,
                //           body: fs.createReadStream(filePath),
                //         },
                //       });
                    
                //       console.log('file created')

                //       // Generate a public URL for the file
                //       await drive.permissions.create({
                //         fileId: response.data.id,
                //         requestBody: {
                //           role: 'reader',
                //           type: 'anyone',
                //         },
                //       });
                    
                //       console.log('link created')

                //       const result = await drive.files.get({
                //         fileId: response.data.id,
                //         fields: 'webViewLink, webContentLink, id',
                //       });
                    
                //       console.log('link fetched')

                //       // Delete the file from the server
                //       fs.unlinkSync(filePath);

                //       console.log(result.data.webContentLink)
                //       console.log(result.data.webViewLink.replace('view?usp=drivesdk', 'preview'))
                //       console.log(result.data.id)
                // })


// Dropbox initialization
require('dotenv/config')
const fetch = require('node-fetch')
const { Dropbox } = require('dropbox')

const dbx = new Dropbox({ accessToken: process.env.DBX_TOKEN, fetch: fetch})


// add post and get requests here



router.get('/', async (req, res) => {
    res.send({message: "Hello world!"})
})

router.post('/auth', async (req, res) => {
    const {user, pass} = req.body
    const result = {message: '', auth: false, userObj: undefined}
    const users = schemas.Users
    const userData = await users.find({ name: user }).exec()
    if (userData[0] === undefined) {
        result.message = "User does not exist"
        res.send(result)
        return
    }
    // There is a valid entry  
    if (userData[0].pass != pass) {
        result.message = "Invalid user and password combination"
        res.send(result)
        return
    }
    // There is a valid entry and the password is the correct one
    users.findOneAndUpdate({name: user}, {lastLoggedIn: Date.now()}, null).exec()
    result.message = JSON.stringify('User found')
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
    const time = (new Date).toLocaleTimeString('en-AU', {timeZone: "Australia/Melbourne"})
    try {
        await dbx.filesGetMetadata({path: '/test.txt',
            include_media_info: false,
            include_deleted: false,
            include_has_explicit_shared_members: false
        })
        res.send({msg: `App is online, last updated at ${time}`, variant: 'success'})
        console.log(`Dropbox Service working; last updated at ${time}`)
    }
    catch (error) {
        res.send({msg: `Dropbox API is offline (file uploads not possible now), last updated at ${time}`, variant: 'danger'})
        console.log(`Services Down, need to update API key, last updated ${time}`)
        console.log(error.error.error_summary)
    }

    
})

router.post('/deleteFile', async(req, res) => {
    const path = req.body.path
    console.log(path)
    try {
        await dbx.filesDeleteV2({
            path: path
        })
        console.log(`File deleted at ${path}`)
        res.send('Successful deletion')
    }
    
    catch {
        console.log('Error occured when deleting ' + path)
        res.send('Unsuccessful deletion')
    }
    
})

router.post('/deleteLesson', async(req, res) => {
    const CURRENTid = req.body.lessonID
    const lessonsSchema = schemas.Lessons
    const usersSchema = schemas.Users
    const coursesSchema = schemas.Courses

    // delete from lessons schema
    await lessonsSchema.deleteOne({lessonID: CURRENTid}).exec()    
    console.log(`Deleted ${req.body.name} from lesson schema`)

    // delete from courses
    const coursesData = await coursesSchema.find({})
    const courseWithLesson = coursesData.filter(courseObject => (courseObject.lessons.filter(lesson => lesson.lessonID === CURRENTid)).length)[0]
    const currentLessons = courseWithLesson.lessons
    await coursesSchema.findOneAndUpdate({name: courseWithLesson.name}, {lessons: currentLessons.filter(lesson => lesson.lessonID != CURRENTid)}).exec()
    console.log(`Deleted ${req.body.name} from lessons in ${courseWithLesson.name}`)

    // delete from students homework schema
    // FOR NOW DO MANUALLY

})

router.post('/assignHomework', async(req, res) => {
    const usersSchema = schemas.Users
    const newHomework = req.body[0] 
    const studentName = req.body[1] 
    const previousLessons = req.body[2] 
    await usersSchema.findOneAndUpdate({name: studentName}, {homework: [...previousLessons, newHomework]}, null).exec()
    .then(() => console.log(`Assigned ${newHomework.name} to ${studentName}`))
    res.send({msg: ('Successfully assignned Homework to ' + req.body[1]), variant: 'success'})
})

module.exports = router