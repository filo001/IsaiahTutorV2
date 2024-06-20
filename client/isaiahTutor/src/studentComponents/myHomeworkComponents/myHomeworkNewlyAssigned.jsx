import { useContext, useState } from "react"
import { CurrentUserContext, LessonsContext, UserContext, UserLessonMapContext } from "../../components/context"
import { Button } from "react-bootstrap"
import AdminStudentAssignedHomeworkPreview from "../../components/adminStudentAssignedHomeworkPreview"
import MyHomeworkUpload from "./myHomeworkUpload"

function MyHomeworkNewlyAssigned({fetchUserData}) {
    const user = useContext(UserContext)

    const [preview, setPreview] = useState(undefined)
    const [isPreviewing, setIsPreviewing] = useState(false)
    const [upload, setUpload] = useState(undefined)

    const lessonMap = useContext(UserLessonMapContext)

    function displayHomework(item) {
        const homework = item.homeworkObject
        if (homework.studentSubmission) {
            return
        }
        const lesson = item.lessonObject
        return (
            <tr key={homework.lessonID}>
                <td><a onClick={() => handlePreview(lesson)} href="#">{homework.name}</a></td>
                <td>{homework.course}</td>
                <td>{lesson.topic[0]}</td>
                <td className="text-center">{homework.maxScore}</td>
                <td><Button onClick={() => setUpload(item)} variant="success">Upload</Button> </td>
            </tr>
        )
    }

    function handlePreview(lesson) {
        setIsPreviewing(true)
        setPreview(lesson)
    }

    return (
        <div className="mt-3">
            <h5>Newly Assigned</h5>
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Lesson Name</th>
                        <th>Course</th>
                        <th>Topic</th>
                        <th>Max Score</th>
                        <th>Submit</th>
                    </tr>
                </thead>
                <tbody>
                    {lessonMap.map(lesson => displayHomework(lesson))}
                </tbody>
            </table>
            {preview ? <AdminStudentAssignedHomeworkPreview preview={preview} isPreviewing={isPreviewing} setIsPreviewing={setIsPreviewing}/> : ''}
            {upload && <MyHomeworkUpload fetchUserData={fetchUserData} upload={upload} setUpload={setUpload} />}
        </div>
    )
}

export default MyHomeworkNewlyAssigned