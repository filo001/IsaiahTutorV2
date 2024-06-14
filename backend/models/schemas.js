const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {type:String},
    pass: {type:String},
    admin: {type: Boolean, default: false},
    courses: {type:Array},
    homework: {type:Array},
    lastLoggedIn: {type: Date, default: Date.now}
})

const courseSchema = new Schema({
    name: {type: String},
    lessons: {type: Array}
})

const lessonSchema = new Schema({
    name: {type: String},
    topics: {type: Array},
    date: {type: Date, default: Date.now},
    homework: {type: Boolean},
    feedback: {type: String},
    score: {type: Number}
})

const Users = mongoose.model('Users',userSchema, 'users')
const Courses = mongoose.model('Courses', courseSchema, 'courses')
const Lessons = mongoose.model('Lessons', lessonSchema, 'lessons')

const mySchema = {'Users': Users, 'Courses': Courses, 'Lessons': Lessons}

module.exports = mySchema