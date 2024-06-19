import { useState } from "react"
import { Button } from "react-bootstrap"
import AdminStudentArchivedPreview from "./adminStudentArchivedPreview"

function AdminStudentArchivedSubmissions({lessonMap, currentStudent}) {

    const [homeworkPreview, setHomeworkPreview] = useState(undefined)

    function mapTable(lessonDict) {
        const homework = lessonDict.homeworkObject
        const lesson = lessonDict.lessonObject
        if (!homework.marked) {
            return
        }

        const score = calculateScore(homework.score, homework.maxScore)
        return (
            <tr key={lesson._id}>
                <td><a onClick={() => setHomeworkPreview(homework)} href="#">{lesson.name}</a></td>
                <td>{homework.score}/{homework.maxScore}</td>
                <td>
                    {homework.feedbackViewed ? 
                    <Button disabled variant="info">Viewed</Button> :
                    <Button disabled variant="warning">Not Viewed</Button>}
                </td>
            </tr>
        )
    }

    function calculateScore(score, maxScore) {
        if (score < 0) {
            return 'Unmarked'
        }
        const calc = Math.round((score / maxScore) * 100)
        return `${calc}%`
    }

    return (
        <div className="mt-3 user-select-none">
            <h3>Archived Submissions</h3>
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Lesson Name</th>
                        <th>Score</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {lessonMap.map(lesson => mapTable(lesson))}
                </tbody>
            </table>
            {homeworkPreview ? <AdminStudentArchivedPreview homeworkPreview={homeworkPreview} setHomeworkPreview={setHomeworkPreview} currentStudent={currentStudent} /> :''}
        </div>
    )
}

export default AdminStudentArchivedSubmissions