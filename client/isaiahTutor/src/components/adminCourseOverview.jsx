import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { StatusContext } from "./context"
import AdminCourseLessonTable from "./adminCourseLessonTable"
import AdminCourseLessonPreview from "./adminCourseLessonPreview"

function AdminCourseOverview({currentCourse, setCurrentCourse}) {
    const [lessons, setLessons] = useState([])
    const [preview, setPreview] = useState(undefined)
    const status = useContext(StatusContext)

    useEffect(() => {
        fetchLessons()
    }, [])

    async function fetchLessons() {
        await axios.get(`${import.meta.env.VITE_ENDPOINT}/lessons`)
        .then(res => {
            mapLessons(res.data)
        })
    }

    function mapLessons(lessonsResponse) {
        const currentCourseIds = currentCourse.lessons.map(course => course.lessonID).filter(id => id ? id : false)
        const courseLessons = lessonsResponse.filter(lesson => currentCourseIds.includes(lesson.lessonID))
        setLessons(courseLessons)
    }

    function displayLessons(lesson) {
        return(
            <tr key={lesson.lessonID}>
                <td><a onClick={() => setPreview(lesson)} href="#">{lesson.name}</a></td>
                <td>{lesson.topic[0]}</td>
                <td>{(new Date(lesson.date)).toDateString()}</td>
                <td><Button>Analytics</Button></td>
            </tr>
        )
    }

    function deleteFile(file) {
        // Delete from dropbox here
    }

    function validConnection() {
        return status.variant === 'success'
    }

    function handleDelete() {
        // check status
        if (!validConnection()) {
            return
        }
        // delete from dropbox
        deleteFile(preview)
        // remove from 'lessons' schema
        // remove from courses -> .lesson schema
        // remove from students 'homework'
    }

    return (
        <>
        <AdminCourseLessonTable setCurrentCourse={setCurrentCourse} lessons={lessons} displayLessons={displayLessons} currentCourse={currentCourse}/>
        {preview ? <AdminCourseLessonPreview preview={preview} setPreview={setPreview} validConnection={validConnection} handleDelete={handleDelete}/> : ''}
        </>
    )
}

export default AdminCourseOverview