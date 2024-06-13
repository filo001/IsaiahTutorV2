import { useContext } from "react"
import { StudentContext } from "./context"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

function AdminStudentAll({setCurrentStudent}) {
    const timeAgo = new TimeAgo('en-AU')
    const students = useContext(StudentContext)

    function handleStudentItem(student) {
        return(
            <tr key={student._id}>
                <td><a href="#" onClick={() => handleClick(student)}>{student.name}</a></td>
                <td>{timeAgo.format(new Date(student.lastLoggedIn))}</td>
            </tr>
        )
    }

    function handleClick(student) {
        setCurrentStudent(student)
    }

    return (
        <div>
            <h2>Student's Overview</h2>
            <table>
                <tbody>
                <tr>
                    <th>Student Name</th>
                    <th>Last Login</th>
                </tr>
                {students.map(student => {
                    return handleStudentItem(student)
                })}
                </tbody>                
            </table>
        </div>  
    )
}

export default AdminStudentAll
