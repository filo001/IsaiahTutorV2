import {Modal, Button} from 'react-bootstrap'

function AdminCourseLessonPreview({preview, setPreview, validConnection, handleDelete}) {
    return (<>
        <Modal className='modal-fullscreen modal-xl' show={Boolean(preview)}>
            <Modal.Header className="d-flex justify-content-between">
                <h3>{preview.name}</h3>
                <Button variant='danger' onClick={() => setPreview(undefined)}>Close</Button>
            </Modal.Header>
            <Modal.Body>
                <a href={preview.embed} rel="noopener noreferrer" target="_blank">Click here to open file in a new tab</a>
                <iframe src={preview.embed} height={800} width='100%'></iframe>
                <Button variant="danger" disabled={!validConnection()} onClick={handleDelete}>Delete Lesson</Button>
            </Modal.Body>
        </Modal>
    </>)
}

export default AdminCourseLessonPreview