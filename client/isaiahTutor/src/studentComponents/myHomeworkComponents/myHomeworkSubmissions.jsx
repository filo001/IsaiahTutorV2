import { useContext, useState } from "react"
import { UserContext, UserLessonMapContext } from "../../components/context"
import { Button } from "react-bootstrap"
import AdminStudentAssignedHomeworkPreview from "../../components/adminStudentAssignedHomeworkPreview"
import AdminStudentArchivedPreview from "../../components/adminStudentArchivedPreview"
import axios from "axios"

function MyHomeworkSubmissions({user, fetchUserData}) {
    const lessonMap = useContext(UserLessonMapContext)
    const [preview, setPreview] = useState(undefined)
    const [isPreviewing, setIsPreviewing] = useState(false)
    const [feedbackPreview, setFeedbackPreview] = useState(undefined)
    const tableStatus = {hasSubmission: false}

    function displaySubmission(item) {
        const homework = item.homeworkObject
        const lesson = item.lessonObject
        if (!homework.studentSubmission) {
            return
        }

        tableStatus.hasSubmission = true
        return (
            <tr key={lesson._id}>
                <td>
                    <div className="d-flex justify-content-between">
                    <a href="#" onClick={() => handlePreview(lesson, homework)}>{lesson.name}</a>
                    {(!homework.feedbackViewed && homework.marked) && <span className="badge bg-primary">New</span>}
                    </div>
                    </td>
                <td>{displayScore(homework.score, homework.maxScore)}</td>
                <td className="text-center">{homework.marked ? 
                    <Button onClick={() => handleFeedback(homework)} variant='dark' className="text-center">View Feedback</Button> : 
                    <Button variant="light" disabled className="text-center">Pending Marking</Button>}</td>
            </tr>
        )
    }

    function displayScore(score, maxScore) {
        if (score < 0) {
            return 'Not marked'
        }

        return `${score}/${maxScore}`
    }

    function handlePreview(lesson, homework) {
        setIsPreviewing(true)
        lesson.embed = homework.submissionEmbed
        setPreview(lesson)
    }

    async function handleFeedback(homework) {
        setFeedbackPreview(homework)
        if (homework.feedbackViewed) {
            return
        }
        const updatedUser = await axios.post(`${import.meta.env.VITE_ENDPOINT}/fetchStudent`, {user: user.name})
        const previousHW = updatedUser.data.homework.filter(h => h ? h.lessonID != homework.lessonID : null)
        const newHW = {...homework, feedbackViewed: true}
        await axios.post(`${import.meta.env.VITE_ENDPOINT}/assignHomework`, [newHW, updatedUser.data.name, previousHW]).
        then(() => fetchUserData())
    }

    return (
        <div className="mt-3">
            <h5>My Submissions</h5>
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Lesson Name</th>
                        <th>Score</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {lessonMap.map(lesson => displaySubmission(lesson))}
                    {!tableStatus.hasSubmission && <tr><td colSpan={3}>You have no submissions currently</td></tr>}
                </tbody>
            </table>
            {preview ? <AdminStudentAssignedHomeworkPreview preview={preview} isPreviewing={isPreviewing} setIsPreviewing={setIsPreviewing}/> : ''}
            {feedbackPreview && <AdminStudentArchivedPreview homeworkPreview={feedbackPreview} setHomeworkPreview={setFeedbackPreview} currentStudent={user}/>}
        </div>
    )
}

export default MyHomeworkSubmissions