import { useEffect, useState } from "react"
import axios from "axios"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'


TimeAgo.addDefaultLocale(en)

function AdminStudentView() {
    const timeAgo = new TimeAgo('en-AU')
    const [students, setStudents] = useState([])

    async function fetchStudentData(){
        // Fetch all students array
        await axios.get('http://localhost:4000/students')
        .then(res => {
            console.log("Students Found")
            setStudents(res.data)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchStudentData()
        return (
            console.log('test')
        )
    }, [])

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
                    return(
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{timeAgo.format(new Date(student.lastLoggedIn))}</td>
                        </tr>
                    )
                })}
                </tbody>                
            </table>
        </div>
    )
}

export default AdminStudentView