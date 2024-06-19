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
                <td><Button disabled>Analytics</Button></td>
            </tr>
        )
    }

    async function deleteFile(file) {
        // Delete from dropbox here
        const filePath = {path: `/${currentCourse.name}/${file.name}.pdf`}
        await axios.post(`${import.meta.env.VITE_ENDPOINT}/deleteFile`, filePath)
    }

    async function removeLesson(lesson) {
        // Get lesson id - > send post request to remove from lessons schema, courses schema and homeork schema
        await axios.post(`${import.meta.env.VITE_ENDPOINT}/deleteLesson`, lesson)
    }

    function validConnection() {
        return status.variant === 'success'
    }

    async function handleDelete() {
        // check status
        if (!validConnection()) {
            return
        }
        // delete from dropbox
        await deleteFile(preview).then(() => {
            removeLesson(preview)
            setCurrentCourse(undefined)
        }).
        then(async () => {
            await fetchLessons().then(() => setCurrentCourse(currentCourse))
        })
        // remove from 'lessons' schema
        
        // remove from courses -> .lesson schema
        // remove from students 'homework'
        
    }

    return (
        <>
        <AdminCourseLessonTable setCurrentCourse={setCurrentCourse} lessons={lessons} displayLessons={displayLessons} currentCourse={currentCourse}/>
        {preview ? <AdminCourseLessonPreview preview={preview} setPreview={setPreview} validConnection={validConnection} handleDelete={async() => await handleDelete()}/> : ''}
        </>
    )
}

export default AdminCourseOverview