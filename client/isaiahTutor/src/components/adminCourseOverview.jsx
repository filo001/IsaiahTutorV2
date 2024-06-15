import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"

function AdminCourseOverview({currentCourse, setCurrentCourse}) {
    const [lessons, setLessons] = useState([])
    const [preview, setPreview] = useState(undefined)

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

    function DisplayLessons(lesson) {
        return(
            <tr key={lesson.lessonID}>
                <td><a onClick={() => setPreview(lesson)} href="#">{lesson.name}</a></td>
                <td>{lesson.topic[0]}</td>
                <td>{(new Date(lesson.date)).toDateString()}</td>
                <td><Button>Analytics</Button></td>
            </tr>
        )
    }

    function handleDelete() {
        // delete from dropbox
        // remove from 'lessons' schema
        // remove from courses -> .lesson schema
        // remove from students 'homework'
    }

    return (
        <>
        <div className="d-flex justify-content-between mb-3">
            <span>Showing Overview for <span style={{fontWeight:700}}>{currentCourse.name}</span></span>
            <Button className="rounded btn-danger btn-sm" onClick={() => setCurrentCourse(undefined)}>Close</Button>  
        </div>
        <table className="table table-hover">
            <thead className="thead-dark">
                <tr>
                    <th>Lesson Name</th>
                    <th>Topic</th>
                    <th>Date Created</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {lessons.map(lesson => DisplayLessons(lesson))}
            </tbody>
        </table>
        {preview ?<Modal className='modal-fullscreen modal-xl' show={Boolean(preview)}>
            <Modal.Header className="d-flex justify-content-between">
                <h3>{preview.name}</h3>
                <Button variant='danger' onClick={() => setPreview(undefined)}>Close</Button>
            </Modal.Header>
            <Modal.Body>
                <iframe src={preview.embed} height={800} width='100%'></iframe>
                <Button variant="danger" onClick={handleDelete}>Delete Lesson</Button>
            </Modal.Body>
        </Modal> : ''}
        </>
    )
}

export default AdminCourseOverview