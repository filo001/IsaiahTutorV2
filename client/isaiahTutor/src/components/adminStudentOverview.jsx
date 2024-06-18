import Button from "react-bootstrap/esm/Button"
import { Modal } from "react-bootstrap"
import { useEffect, useState } from "react"
import axios from "axios"
import AdminStudentDeleteModal from "./adminStudentDeleteModal"
import AdminStudentCourseOverview from "./adminStudentCourseOverview"
import AdminStudentAssignedHomework from "./adminStudentAssignedHomework"
import AdminStudentArchivedSubmissions from "./adminStudentArchivedSubmissions"

function AdminStudentOverview({currentStudent, setCurrentStudent, fetchStudentData}) {

    const [deletedUser, setDeletedUser] = useState(undefined)
    const [deleteForm, setDeleteForm] = useState('')
    const [lessonMap, setLessonMap] = useState([])

    useEffect(() => {
        mapHomeworkToLesson()
    }, [])
        
    async function getStudentLessons() {
        const allLessons = await axios.get(`${import.meta.env.VITE_ENDPOINT}/lessons`).
        then(res => res.data)
        const currentStudentHomeworkIDs = currentStudent.homework.map(hwItem => hwItem ? hwItem.lessonID : null)
        return allLessons.filter(lesson => currentStudentHomeworkIDs.includes(lesson.lessonID))
    }

    async function mapHomeworkToLesson() {
        const userLessons = await getStudentLessons()
        const studentHomework = currentStudent.homework
        const map = []
        studentHomework.map(homework => {
            if (!homework) {
                return
            }
            const match = userLessons.filter(lesson => lesson.lessonID == homework.lessonID)
            map.push({homeworkObject: homework, lessonObject: match[0]})
        })
        setLessonMap(map)
        console.log(map)
    }


    function handleClose () {
        setCurrentStudent(undefined)
    }

    return (
        <>
        <div className="d-flex justify-content-between user-select-none">
            <span>Showing <span style={{fontWeight:700}}>{currentStudent.name}</span>'s Overview</span>
            <Button className="rounded btn-danger btn-sm" onClick={handleClose}>Close</Button>  
        </div>
        <AdminStudentCourseOverview currentStudent={currentStudent} />
        <AdminStudentAssignedHomework currentStudent={currentStudent} lessonMap={lessonMap} />
        <AdminStudentArchivedSubmissions lessonMap={lessonMap} currentStudent={currentStudent}/>
        <Button variant="danger mt-3" onClick={() => setDeletedUser(currentStudent)}>Delete Student</Button>
        <AdminStudentDeleteModal deletedUser={deletedUser} setDeletedUser={setDeletedUser} deleteForm={deleteForm} setDeleteForm={setDeleteForm} setCurrentStudent={setCurrentStudent} fetchStudentData={fetchStudentData} />
        
        </>
    )
}

export default AdminStudentOverview