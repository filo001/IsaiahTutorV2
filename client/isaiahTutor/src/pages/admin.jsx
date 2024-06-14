import AdminCourseView from "../components/adminCourseView"
import AdminStudentView from "../components/adminStudentView"
import axios from 'axios'
import { CourseContext, StudentContext } from '../components/context'
import { useEffect, useState } from "react"

function Admin() {
    // Contexts
    const [courses, setCourses] = useState([])
    const [students, setStudents] = useState([])

    // Fetching data
    async function fetchStudentData(){
        // Fetch all students array
        await axios.get(`${import.meta.env.VITE_ENDPOINT}/students`)
        .then(res => {
            console.log("Students loaded")
            setStudents(res.data)
        })
        .catch(err => console.log(err))
    }
    async function fetchCourses() {
        // fetch all courses into here
        await axios.get(`${import.meta.env.VITE_ENDPOINT}/courses`)
        .then(
            res => {
                setCourses(res.data)
                console.log('Courses loaded')
            }
        )
    }

    // Debug
    function debug() {
        console.log(`Courses Context Provider:`)
        console.log(courses)
        console.log(`Students Context Provider:`)
        console.log(students)
    }


    // Initialization 
    useEffect(() => {
        fetchStudentData()
        fetchCourses()
        console.log('fetched Data')
    }, [])

    return (
        <>
        <CourseContext.Provider value={courses}>
            <StudentContext.Provider value={students}>
                <div className="w-100 container"> 
                    <div className="row">
                        <div className="col">
                            <AdminStudentView fetchStudentData={fetchStudentData} fetchCourses={fetchCourses}/>
                        </div>
                        <div className="col">
                            <AdminCourseView fetchCourses={fetchCourses}/>
                        </div>
                    </div>
                </div>   
            </StudentContext.Provider>
        </CourseContext.Provider>
        </>
    )
}

export default Admin