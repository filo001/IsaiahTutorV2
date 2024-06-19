import { Button, Modal } from "react-bootstrap"

function AdminStudentArchivedPreview ({homeworkPreview, setHomeworkPreview, currentStudent}) {
    
    function studentScore() {
        return Math.round((homeworkPreview.score / homeworkPreview.maxScore) * 100)
    }

    function colorBar() {
        const score = studentScore()
        if (score > 85) {
            return 'success'
        }
        if (score > 50) {
            return 'warning + text-dark'
        }
        return 'danger'
    }

    return (
        <Modal className='modal-fullscreen modal-xl user-select-none' show={Boolean(homeworkPreview)}>
            <Modal.Header className="d-flex justify-content-between">
                <h3>{currentStudent.name}'s feedback for {homeworkPreview.name}</h3>
                <Button variant='danger' onClick={() => setHomeworkPreview(undefined)}>Close</Button>
            </Modal.Header>
            <Modal.Body>
                <a href={homeworkPreview.feedbackEmbed} rel="noopener noreferrer" target="_blank">Click here to open file in a new tab</a>
                <iframe src={homeworkPreview.feedbackEmbed} height={800} width='100%'></iframe>
                <h3>Student Performance</h3>
                <div className="row">
                    <p className="col"><b>Student Score:</b> {homeworkPreview.score}</p>
                    <p className="col"><b>Max Score:</b> {homeworkPreview.maxScore}</p>
                </div>
                <div className="progress mb-3">
                        <div className={"progress-bar progress-bar-striped bg-" + colorBar()} role='progressbar' aria-valuenow={studentScore()} style={{width: `${studentScore()}%`}} aria-valuemin="0" aria-valuemax="100">
                            {studentScore()}%
                        </div>
                </div>
                <b>Feedback</b>
                <p>{homeworkPreview.feedback}</p>
                </Modal.Body>
            </Modal>
    )
}

export default AdminStudentArchivedPreview