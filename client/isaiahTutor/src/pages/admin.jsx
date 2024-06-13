import AdminCourseView from "../components/adminCourseView"
import AdminStudentView from "../components/adminStudentView"
import axios from 'axios'
import { StudentContext } from '../components/context'
import { useEffect, useState } from "react"

function Admin() {

    const [students, setStudents] = useState([])
    // Still might want to dynamically update the context here
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
        console.log('fetched Data')
    }, [])

    return (
        <>
        <StudentContext.Provider value={students}>
            <div className="w-100 container"> 
                <div className="row">
                    <div className="col">
                        <AdminStudentView fetchStudentData={fetchStudentData}/>
                    </div>
                    <div className="col">
                        <AdminCourseView/>
                    </div>
                </div>
            </div>   
        </StudentContext.Provider>
        </>
    )
}

export default Admin