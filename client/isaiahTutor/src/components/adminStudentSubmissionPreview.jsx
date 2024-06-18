import { Modal, Button } from "react-bootstrap"

function AdminStudentSubmissionPreview({homeworkPreview, setHomeworkPreview, currentStudent}) {
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
            <textarea className="form-control"></textarea>
            <div className="row">
                <div className="form-group col">
                    <label className="form-label">Set Score</label>
                    <input type="number" className="form-control" />
                </div>
                <div className="form-group col">
                    <label className="form-label">Feedback File (PDF)</label>
                    <input type="file" className="form-control" />
                </div>
            </div>
            
            {/* 
            Set marked to true
            Set score
            Set Feedback
            Set feedbackEmbed
            */}
            <Button className="mt-3 w-100">Submit Feedback</Button>
        </Modal.Body>
    </Modal>
    )
}

export default AdminStudentSubmissionPreview