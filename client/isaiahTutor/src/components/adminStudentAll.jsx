import { useContext, useState } from "react"
import { StudentContext } from "./context"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import AdminStudentAdd from "./adminStudentAdd"
import Button from "react-bootstrap/esm/Button"

TimeAgo.addDefaultLocale(en)

function AdminStudentAll({setCurrentStudent, fetchStudentData}) {
    const timeAgo = new TimeAgo('en-AU')
    const students = useContext(StudentContext)
    const [adding, setAdding] = useState(false)

    function handleStudentItem(student) {
        return(
            <tr key={student._id}>
                <td><a href="#" onClick={() => handleClick(student)}>{student.name}</a></td>
                <td>{timeAgo.format(new Date(student.lastLoggedIn))}</td>
                <td><Button onClick={() => handleStudentDelete(student)}>Delete Student</Button></td>
            </tr>
        )
    }

    function handleStudentDelete(student) {
        const payload = prompt(`This student will be removed from the database, type ${student.name} to confirm`)
        if (payload === student.name) {
            alert('student deleted')
            // delete from database here
        }
    }

    function handleClick(student) {
        setCurrentStudent(student)
    }

    return (
        <>
            <h2>Student's Overview</h2>
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
            {adding ? <AdminStudentAdd setAdding={setAdding}/> : <Button onClick={() => setAdding(true)}>Add New Student +</Button>}
        </>  
    )
}

export default AdminStudentAll
