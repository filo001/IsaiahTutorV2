import { useContext, useState } from "react"
import { StudentContext } from "./context"
import AdminStudentAll from "./adminStudentAll"
import AdminStudentOverview from "./adminStudentOverview"

function AdminStudentView() {
    
    const [currentStudent, setCurrentStudent] = useState(undefined)
    const students = useContext(StudentContext)

    return (
        <>
            {currentStudent ? <AdminStudentOverview currentStudent={currentStudent} setCurrentStudent={setCurrentStudent} /> : <AdminStudentAll setCurrentStudent={setCurrentStudent}/>}
        </>
    )
}

export default AdminStudentView