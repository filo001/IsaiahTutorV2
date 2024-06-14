import { useState } from "react"
import AdminCourseAll from "./adminCourseAll"
import AdminCourseOverview from "./adminCourseOverview"

function AdminCourseView({fetchCourses}) {

    const [currentCourse, setCurrentCourse] = useState(undefined)

    return (
        <div className="w-100 p-2 bg-light rounded">
            {currentCourse ? <AdminCourseOverview currentCourse={currentCourse} setCurrentCourse={setCurrentCourse}/> : 
            <AdminCourseAll  setCurrentCourse={setCurrentCourse} fetchCourses={fetchCourses}/>}
        </div>

    )
}

export default AdminCourseView

// {currentStudent ? <AdminStudentOverview currentStudent={currentStudent} setCurrentStudent={setCurrentStudent} /> : 
//             <AdminStudentAll setCurrentStudent={setCurrentStudent} fetchStudentData={fetchStudentData}/>}