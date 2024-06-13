import { useContext, useState } from "react"
import { StudentContext } from "./context"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import AdminStudentAdd from "./adminStudentAdd"
import { Modal } from 'react-bootstrap';
import Button from "react-bootstrap/esm/Button"

TimeAgo.addDefaultLocale(en)

function AdminStudentAll({setCurrentStudent, fetchStudentData}) {
    const timeAgo = new TimeAgo('en-AU')
    const students = useContext(StudentContext)
    const [adding, setAdding] = useState(false)
    const [deletedUser, setDeletedUser] = useState(undefined)
    const [deleteForm, setDeleteForm] = useState('')

    function handleStudentItem(student) {
        return(
            <tr key={student._id}>
                <td><a href="#" onClick={() => handleClick(student)}>{student.name}</a></td>
                <td>{timeAgo.format(new Date(student.lastLoggedIn))}</td>
                <td><Button onClick={() => setDeletedUser(student)}>Delete Student</Button></td>
            </tr>
        )
    }

    function handleStudentDelete() {    
        if (deleteForm === deletedUser.name) {
            alert('student deleted')
            // delete from database here
        }
        setDeleteForm('')
        setDeletedUser(undefined)
    }

    function handleClick(student) {
        setCurrentStudent(student)
    }

    return (
        <>
            <h2>Students Overview</h2>
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Student Name</th>
                        <th>Last Login</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {students.map(student => {
                    return handleStudentItem(student)
                })}
                </tbody>                
            </table>
            <Button onClick={() => setAdding(true)}>Add New Student +</Button>
            <Modal show={adding}>
                <AdminStudentAdd setAdding={setAdding} />
            </Modal>
            <Modal show={deletedUser === undefined ? false : true}>
                <Modal.Header>
                    <Modal.Title>
                        Are you sure you want to delete this user?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-grid gap-2">
                    This Student will be permanently deleted, 
                    to confirm this, type '{deletedUser == undefined ? '' : deletedUser.name}'
                    <input onChange={e => setDeleteForm(e.target.value)} value={deleteForm} type="text" className="form-control"/>
                    <Button onClick={handleStudentDelete} className="btn-danger">Confirm Delete</Button>
                    <Button onClick={() => setDeletedUser(undefined)}>Cancel</Button>
                </Modal.Body>
                
            </Modal>
        </>  
    )
}

export default AdminStudentAll
