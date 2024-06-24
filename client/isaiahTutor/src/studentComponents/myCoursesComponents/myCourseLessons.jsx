import { useContext, useState } from "react"
import { Button } from "react-bootstrap"
import { LessonsContext } from "../../components/context"
import AdminStudentAssignedHomeworkPreview from "../../components/adminStudentAssignedHomeworkPreview"

function MyCourseLessons({course, setCourse}) {
    const lessons = useContext(LessonsContext)
    const [preview, setPreview] = useState(undefined)
    const [isPreviewing, setIsPreviewing] = useState(false)

    function displayLessons(lesson) {
        if (!lesson) {
            return
        }
        const currentLesson = lessons.filter(l => l ? l.lessonID == lesson.lessonID : false)[0]
        if (!currentLesson || !currentLesson.name) {
            console.log('Bug Caught')
            return
        }
        return (
            <tr key={currentLesson._id}>
                <td>{currentLesson.name}</td>
                <td>{currentLesson.topic[0]}</td>
                <td>{(new Date(currentLesson.date)).toDateString()}</td>
                <td><Button onClick={() => handlePreview(currentLesson)}>View</Button></td>
            </tr>
        )
    }

    function handlePreview(lesson) {
        setPreview(lesson)
        setIsPreviewing(true)
    }

    return (
        <>
        <div className="d-flex justify-content-between">
            <h3>Lessons for {course.name}</h3>
            <Button onClick={() => setCourse(undefined)} variant="danger">Close</Button>
        </div>
        <table className="table table-hover mt-3">
            <thead className="thead-dark">
                <tr>
                    <th>Lesson Name</th>
                    <th>Topic</th>
                    <th>Date Created</th>
                    <th>View</th>
                </tr>
            </thead>
            <tbody>
                {course.lessons.map(lesson => displayLessons(lesson))}
            </tbody>
        </table>
        {preview ? <AdminStudentAssignedHomeworkPreview preview={preview} isPreviewing={isPreviewing} setIsPreviewing={setIsPreviewing}/> : ''}
        </>        
    )
}

export default MyCourseLessons