const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {type:String},
    pass: {type:String},
    admin: {type: Boolean, default: false},
    courses: {type:Array, default: [null]},
    homework: {type:Array, default: [null]}, // [{lesson: lesson_id, feedback: feedback, score: score default is 0, feedbackViewed: boolean, marked: boolean}]
    lastLoggedIn: {type: Date, default: Date.now}
})

const courseSchema = new Schema({
    name: {type: String},
    lessons: {type: Array, default: []}, // [name: name, lesson_id: _id]
    topics: {type: Array, default: []}
})

const lessonSchema = new Schema({
    name: {type: String},
    topic: {type: Array, default: []},
    date: {type: Date, default: Date.now},
    homework: {type: Boolean},
    max_score: {type: Number},
    embed: {type: String},
    lessonID: {type: String}
})

const Users = mongoose.model('Users',userSchema, 'users')
const Courses = mongoose.model('Courses', courseSchema, 'courses')
const Lessons = mongoose.model('Lessons', lessonSchema, 'lessons')

const mySchema = {'Users': Users, 'Courses': Courses, 'Lessons': Lessons}

module.exports = mySchema