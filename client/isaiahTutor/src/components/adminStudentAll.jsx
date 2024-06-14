import { useContext, useEffect, useState } from "react"
import { StudentContext } from "./context"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import AdminStudentAdd from "./adminStudentAdd"
import { Modal } from 'react-bootstrap';
import Button from "react-bootstrap/esm/Button"
import axios from "axios"

TimeAgo.addDefaultLocale(en)

function AdminStudentAll({setCurrentStudent, fetchStudentData, fetchCourses}) {
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
                <td><Button variant="danger" onClick={() => setDeletedUser(student)}>Delete Student</Button></td>
            </tr>
        )
    }

    async function handleStudentDelete() {    
        if (deleteForm === deletedUser.name) {
          await axios.post('http://localhost:4000/deleteStudent', deletedUser)
          .then(res => console.log(res))
          .catch(err => console.log(err))  
        }
        setDeleteForm('')
        setDeletedUser(undefined)
        fetchStudentData()
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
                <AdminStudentAdd fetchStudentData={fetchStudentData} setAdding={setAdding} fetchCourses={fetchCourses} />
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
                    <Button onClick={handleStudentDelete} className="btn-danger" disabled={(deletedUser) && !(deleteForm === deletedUser.name)}>Confirm Delete</Button>
                    <Button onClick={() => setDeletedUser(undefined)}>Cancel</Button>
                </Modal.Body>
                
            </Modal>
        </>  
    )
}

export default AdminStudentAll
