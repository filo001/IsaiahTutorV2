import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import axios from "axios"
import AdminStudentAssignedHomeworkPreview from "./adminStudentAssignedHomeworkPreview"
import AdminStudentSubmissionPreview from "./adminStudentSubmissionPreview"

function AdminStudentAssignedHomework({setLessonMap, lessonMap, currentStudent}) {
    const [isPreviewing, setIsPreviewing] = useState(false)
    const [preview, setPreview] = useState(undefined)
    const [homeworkPreview, setHomeworkPreview] = useState(undefined)

    function mapHomework(lesson) {
        if (!(lesson.lessonObject)) {
            return
        }
        if (lesson.homeworkObject.marked) {
            return
        }
        return (
            <tr key={lesson.lessonObject.lessonID}>
                <td><a href="#" onClick={() => {setPreview(lesson.lessonObject) ; setIsPreviewing(true)}}>{lesson.homeworkObject.name}</a></td>
                <td>{lesson.homeworkObject.course}</td>
                <td>{lesson.lessonObject.topic[0]}</td>
                <td>{lesson.homeworkObject.studentSubmission ? 
                    <Button onClick={() => setHomeworkPreview(lesson.homeworkObject)} variant="success">Completed</Button> :
                    <Button variant="outline-danger" disabled>Incomplete</Button>}</td>
            </tr>
        )
    }

    return (
        <div className="mt-3 user-select-none">
            <h3>Assigned Homework</h3>
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Lesson Name</th>
                        <th>Course</th>
                        <th>Topic</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {lessonMap.map(lesson => mapHomework(lesson))}
                </tbody>
            </table>
            {preview ? <AdminStudentAssignedHomeworkPreview preview={preview} setIsPreviewing={setIsPreviewing} isPreviewing={isPreviewing}/> : ''}
            {homeworkPreview ? <AdminStudentSubmissionPreview lessonMap={lessonMap} setLessonMap={setLessonMap} currentStudent={currentStudent} homeworkPreview={homeworkPreview} setHomeworkPreview={setHomeworkPreview} /> : ''}
        </div>
    )
}

export default AdminStudentAssignedHomework