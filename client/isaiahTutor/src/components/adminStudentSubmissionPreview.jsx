import { useContext, useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { StatusContext } from "./context"
import axios from "axios"


function AdminStudentSubmissionPreview({homeworkPreview, setHomeworkPreview, currentStudent, lessonMap, setLessonMap}) {
    const [file, setFile] = useState(undefined)
    const [error, setError] = useState({msg: '', variant: ''})
    const [payload, setPayload] = useState({lessonID: homeworkPreview.lessonID,feedback: '', score: 0, feedbackEmbed: '', marked: true})
    const status = useContext(StatusContext)

    async function updateLessonMap() {
        const newLessonMap = lessonMap.map(lesson => {
            if (lesson.homeworkObject.lessonID != homeworkPreview.lessonID) {
                return lesson
            }
            lesson.homeworkObject = {...lesson.homeworkObject, feedback: payload.feedback, score: payload.score, marked: payload.marked}
            return lesson
            
        })
        setLessonMap(newLessonMap)
    }

    async function handleUploadAndLink() {
        setError({msg: 'Uploading file', variant: 'info'})
        const link = await fetch('https://content.dropboxapi.com/2/files/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_DBX}`,
                'Content-Type': 'application/octet-stream',
                'Dropbox-API-Arg': `{"path":"/${homeworkPreview.course}/${currentStudent.name}/${homeworkPreview.name}-feedback.pdf","mode":{".tag":"overwrite"},"autorename":true,"mute":false}`
            },
            body: file}).then(async() => {
                setError({msg: 'Creating link', variant: 'info'})
                return await axios.post(`${import.meta.env.VITE_ENDPOINT}/createLink`, `/${homeworkPreview.course}/${currentStudent.name}/${homeworkPreview.name}-feedback.pdf`)})
        setError({msg: 'File uploaded, uploading student feedback to database...', variant: 'info'})
        return link.data
    }

    async function handleSubmit() {
        console.log(payload)
        if (status.variant === 'danger') {
            // Handle error with connection
            setError({msg: 'Invalid Connection', variant: 'danger'})
            return
        }
        const valid = validateScore()
        if (!valid || !payload.feedback.length || !file) {
            // Handle error with form
            setError({msg: 'Invalid Form, please check that all the forms are filled and that the score is within the range', variant: 'danger'})
            return
        }
        // Upload File with path /{course}/{studentName}/{LessonName}-Feedback.pdf
        const embedLink = await handleUploadAndLink()
        // Get file link and create new payload constant with all the same properties including feedback embed
        const previousHW = currentStudent.homework.filter(h => h ? h.lessonID != homeworkPreview.lessonID : null)
        const newHW = {...homeworkPreview, feedback: payload.feedback, score: payload.score, marked: true, feedbackEmbed: embedLink}
        // Post request to the database to set new homework array for student
        await axios.post(`${import.meta.env.VITE_ENDPOINT}/assignHomework`, [newHW, currentStudent.name, previousHW]).then(
            () => {
                setError({msg: 'Uploaded to database successfully', variant: 'success'})
                updateLessonMap()
            }
        ).catch(() => setError({msg: 'Problem with uploading to database', variant: 'danger'}))

        // Exit preview while setting currentStudent homework to new one (so that it doesnt bug locally)
    }

    function validateScore() {
        const maxScore = homeworkPreview.maxScore
        return ((payload.score > -1) && (maxScore >= payload.score))
    }

    return (
    <Modal className='modal-fullscreen modal-xl user-select-none' show={Boolean(homeworkPreview)}>
        <Modal.Header className="d-flex justify-content-between">
            <h3>{currentStudent.name}'s submission for {homeworkPreview.name}</h3>
            <Button variant='danger' onClick={() => setHomeworkPreview(undefined)}>Close</Button>
        </Modal.Header>
        <Modal.Body>
            <a href={homeworkPreview.submissionEmbed} rel="noopener noreferrer" target="_blank">Click here to open file in a new tab</a>
            <iframe src={homeworkPreview.submissionEmbed} height={800} width='100%'></iframe>
            <label className="form-label">Give Feedback</label>
            <textarea value={payload.feedback} onChange={e => setPayload({...payload, feedback: e.target.value})} className="form-control"></textarea>
            <div className="row">
                <div className="form-group col">
                    <div className="form-group row">
                        <div className="form-group col">
                            <label className="form-label">Set Score</label>
                            <input type="number" className="form-control" value={payload.score} onChange={e => setPayload({...payload, score: parseFloat(e.target.value)})} />
                        </div>
                        <div className="form-group col">
                            <label className="form-label">Max Score</label>
                            <input className='form-control' type="number" disabled value={homeworkPreview.maxScore} />
                        </div>
                    </div>
                    
                </div>
                <div className="form-group col">
                    <label className="form-label">Feedback File (PDF)</label>
                    <input type="file" onChange={e => setFile(e.target.files[0])} className="form-control" />
                </div>
            </div>
            <Button disabled={status.variant === 'danger' || error.variant === 'success' || error.variant === 'info'} onClick={handleSubmit} className="mt-3 w-100">Submit Feedback</Button>
            {Boolean(error.msg.length) && <div className={"mt-3 alert alert-" + error.variant}>{error.msg}</div>}
        </Modal.Body>
    </Modal>
    )
}

export default AdminStudentSubmissionPreview