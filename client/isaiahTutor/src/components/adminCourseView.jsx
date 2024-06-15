import { useState } from "react"
import AdminCourseAll from "./adminCourseAll"
import AdminCourseOverview from "./adminCourseOverview"
import AdminCourseLessonAdd from "./adminCourseLessonAdd"

function AdminCourseView({fetchCourses}) {

    const [currentCourse, setCurrentCourse] = useState(undefined)
    const [selected, setSelected] = useState(undefined)

    return (
        <div className="w-100 p-2 bg-light rounded user-select-none">
            {currentCourse ? <AdminCourseOverview currentCourse={currentCourse} setCurrentCourse={setCurrentCourse}/> : 
            selected ? <AdminCourseLessonAdd fetchCourses={fetchCourses} course={selected} setSelected={setSelected}/> : <AdminCourseAll  setCurrentCourse={setCurrentCourse} fetchCourses={fetchCourses} setSelected={setSelected}/>}
        </div>

    )
}

export default AdminCourseView

// {currentStudent ? <AdminStudentOverview currentStudent={currentStudent} setCurrentStudent={setCurrentStudent} /> : 
//             <AdminStudentAll setCurrentStudent={setCurrentStudent} fetchStudentData={fetchStudentData}/>}