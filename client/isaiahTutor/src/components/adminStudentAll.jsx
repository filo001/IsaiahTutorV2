import { useContext, useEffect, useState } from "react"
import { StudentContext } from "./context"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import AdminStudentAdd from "./adminStudentAdd"
import { Modal } from 'react-bootstrap';
import Button from "react-bootstrap/esm/Button"
import axios from "axios"

TimeAgo.addDefaultLocale(en)

function AdminStudentAll({setCurrentStudent, fetchStudentData, fetchCourses, setAssignedStudent}) {
    const timeAgo = new TimeAgo('en-AU')
    const students = useContext(StudentContext)
    const [adding, setAdding] = useState(false)

    function handleStudentItem(student) {
        return(
            <tr key={student._id} className="user-select-none">
                <td><a href="#" onClick={() => handleClick(student)}>{student.name}</a></td>
                <td>{timeAgo.format(new Date(student.lastLoggedIn))}</td>
                <td><Button variant="success" onClick={() => setAssignedStudent(student)}>Assign Homework</Button></td>
            </tr>
        )
    }

    function handleClick(student) {
        setCurrentStudent(student)
    }

    return (
        <>
            <h2 className="user-select-none">Students Overview</h2>
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr className="user-select-none">
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
        </>  
    )
}

export default AdminStudentAll
