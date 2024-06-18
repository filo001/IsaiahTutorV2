import { Button, Modal } from "react-bootstrap"

function AdminStudentAssignedHomeworkPreview ({isPreviewing, preview, setIsPreviewing}) {
    return (
        <Modal className='modal-fullscreen modal-xl user-select-none' show={isPreviewing}>
            <Modal.Header className="d-flex justify-content-between">
                <h3>{preview.name}</h3>
                <Button variant='danger' onClick={() => setIsPreviewing(false)}>Close</Button>
            </Modal.Header>
            <Modal.Body>
                <a href={preview.embed} rel="noopener noreferrer" target="_blank">Click here to open file in a new tab</a>
                <iframe src={preview.embed} height={800} width='100%'></iframe>
            </Modal.Body>
        </Modal>
    )
}

export default AdminStudentAssignedHomeworkPreview