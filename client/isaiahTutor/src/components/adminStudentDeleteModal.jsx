import axios from "axios"
import { Modal, Button } from "react-bootstrap"

function AdminStudentDeleteModal({setCurrentStudent, deletedUser, setDeleteForm, deleteForm, setDeletedUser, handleStudentDelete, fetchStudentData}) {

    async function handleStudentDelete() {    
        if (deleteForm === deletedUser.name) {
          await axios.post(`${import.meta.env.VITE_ENDPOINT}/deleteStudent`, deletedUser)
          .then(res => console.log('Student Deleted'))
          .catch(err => console.log(err))  
        }
        setDeleteForm('')
        setDeletedUser(undefined)
        await fetchStudentData().then(() => setCurrentStudent(undefined))
        
        
    }

    return (
        <Modal show={deletedUser === undefined ? false : true}>
                <Modal.Header>
                    <Modal.Title className="user-select-none">
                        Are you sure you want to delete this user?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-grid gap-2">
                    This Student will be permanently deleted, 
                    to confirm this, type '{deletedUser == undefined ? '' : deletedUser.name}'
                    <input onChange={e => setDeleteForm(e.target.value)} value={deleteForm} type="text" className="form-control"/>
                    <Button onClick={handleStudentDelete} className="btn-danger" disabled={(deletedUser) && !(deleteForm === deletedUser.name)}>Confirm Delete</Button>
                    <Button onClick={() => setDeletedUser(undefined)}>Cancel</Button>
                </Modal.Body>
            </Modal>
    )
}

export default AdminStudentDeleteModal