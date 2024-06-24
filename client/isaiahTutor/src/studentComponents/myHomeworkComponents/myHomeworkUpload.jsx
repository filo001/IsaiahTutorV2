import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { StatusContext, UserContext } from "../../components/context";

function MyHomeworkUpload({upload, setUpload, fetchUserData}) {
    const [error, setError] = useState({msg: '', variant:''})
    const [file, setFile] = useState(undefined)
    const status = useContext(StatusContext)
    const user = useContext(UserContext)
    const homework = upload.homeworkObject
    const lesson = upload.lessonObject

    async function handleSubmit() {
        if (!Boolean(file)) {
            setError({msg: 'No file selected', variant: 'danger'})
            return
        }
        if (file.type != 'application/pdf') {
            setError({msg: 'Please input a PDF', variant: 'danger'})
            return
        }
        if (status.variant === 'danger') {
            setError({msg: 'Invalid Connection', variant: 'danger'})
            return
        }
        const embed = await handleUploadAndLink()
        const updatedUser = await axios.post(`${import.meta.env.VITE_ENDPOINT}/fetchStudent`, {user: user.name})
        const previousHW = updatedUser.data.homework.filter(h => h ? h.lessonID != homework.lessonID : null)
        const newHW = {...homework, studentSubmission: true, submissionEmbed: embed}
        await axios.post(`${import.meta.env.VITE_ENDPOINT}/assignHomework`, [newHW, updatedUser.data.name, previousHW]).then(
            () => {
                setError({msg: 'Uploaded to database successfully', variant: 'success'})
                fetchUserData()
            }
        ).catch(() => setError({msg: 'Problem with uploading to database', variant: 'danger'}))

    }

    async function handleUploadAndLink() {
        setError({msg: 'Uploading file', variant: 'info'})
        const formPayload = new FormData()
        formPayload.append('file', file)
        formPayload.append('path', `/${homework.course}/${user.name}/${homework.name}-submission.pdf`)
        const link = await axios.post(`${import.meta.env.VITE_ENDPOINT}/uploadFile`, formPayload)
        .then(async() => {
                setError({msg: 'Creating link', variant: 'info'})
                return await axios.post(`${import.meta.env.VITE_ENDPOINT}/createLink`, `/${homework.course}/${user.name}/${homework.name}-submission.pdf`)})
        setError({msg: 'File uploaded, uploading other information to database...', variant: 'info'})
        return link.data
    }

    return (
        <Modal className="user-select-none modal-xl" show={Boolean(upload)}>
            <Modal.Header className="d-flex justify-content-between">
                <h3>Submission for {lesson.name}</h3>
                <Button onClick={() => setUpload(undefined)} variant="danger">Close</Button>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col">
                        <label className="form-label">Submission (PDF)</label>
                        <input onChange={e => setFile(e.target.files[0])} type="file" className="form-control" />
                    </div>
                    <div className="col">
                        <label className="form-label">Max Score</label>
                        <input type="number" disabled value={homework.maxScore} className="form-control" />
                    </div>
                </div>
                <Button disabled={error.variant == 'info' || error.variant == 'success'} onClick={handleSubmit} className="mt-3">Submit</Button>
                {Boolean(error.msg) && <div className={'mt-3 alert alert-' + error.variant}>{error.msg}</div>}
                <h5 className="mt-3">Original Lesson</h5>
                <a href={lesson.embed} rel="noopener noreferrer" target="_blank">Click here to open file in a new tab</a>
                <iframe src={lesson.embed} height={800} width='100%'></iframe>
            </Modal.Body>
        </Modal>
    )
}

export default MyHomeworkUpload