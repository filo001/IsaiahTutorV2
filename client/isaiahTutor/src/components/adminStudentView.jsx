import { useState } from "react"
import AdminStudentAll from "./adminStudentAll"
import AdminStudentOverview from "./adminStudentOverview"

function AdminStudentView({fetchStudentData}) {
    
    const [currentStudent, setCurrentStudent] = useState(undefined)


    return (
        <div className="w-100 p-2 bg-light rounded">
            {currentStudent ? <AdminStudentOverview currentStudent={currentStudent} setCurrentStudent={setCurrentStudent} /> : 
            <AdminStudentAll setCurrentStudent={setCurrentStudent} fetchStudentData={fetchStudentData}/>}
        </div>
    )
}

export default AdminStudentView