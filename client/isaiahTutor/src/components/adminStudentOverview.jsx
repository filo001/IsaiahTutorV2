import Button from "react-bootstrap/esm/Button"
import { Modal } from "react-bootstrap"
import { useState } from "react"
import axios from "axios"
import AdminStudentDeleteModal from "./adminStudentDeleteModal"

function AdminStudentOverview({currentStudent, setCurrentStudent, fetchStudentData}) {

    const [deletedUser, setDeletedUser] = useState(undefined)
    const [deleteForm, setDeleteForm] = useState('')
    
    function handleClose () {
        setCurrentStudent(undefined)
    }

    return (
        <>
        <div className="d-flex justify-content-between user-select-none">
            <span>Showing <span style={{fontWeight:700}}>{currentStudent.name}</span>'s Overview</span>
            <Button className="rounded btn-danger btn-sm" onClick={handleClose}>Close</Button>  
        </div>
        <Button variant="danger mt-3" onClick={() => setDeletedUser(currentStudent)}>Delete Student</Button>

        <AdminStudentDeleteModal deletedUser={deletedUser} setDeletedUser={setDeletedUser} deleteForm={deleteForm} setDeleteForm={setDeleteForm} setCurrentStudent={setCurrentStudent} fetchStudentData={fetchStudentData} />
        </>
    )
}

export default AdminStudentOverview