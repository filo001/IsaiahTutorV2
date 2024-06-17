import { useState } from "react"
import AdminStudentAll from "./adminStudentAll"
import AdminStudentOverview from "./adminStudentOverview"
import AdminStudentAssignHW from "./adminStudentAssignHW"

function AdminStudentView({fetchStudentData, fetchCourses}) {
    
    const [currentStudent, setCurrentStudent] = useState(undefined)
    const [assignedStudent, setAssignedStudent] = useState(undefined)

    

    return (
        <div className="w-100 p-2 bg-light rounded">
            {currentStudent ? <AdminStudentOverview currentStudent={currentStudent} setCurrentStudent={setCurrentStudent} fetchStudentData={fetchStudentData} /> : 
            assignedStudent ? <AdminStudentAssignHW  assignedStudent={assignedStudent} setAssignedStudent={setAssignedStudent} fetchCourses={fetchCourses} fetchStudentData={fetchStudentData}/> :
            <AdminStudentAll setCurrentStudent={setCurrentStudent} fetchStudentData={fetchStudentData} fetchCourses={fetchCourses} setAssignedStudent={setAssignedStudent} />}
        </div>
    )
}

export default AdminStudentView