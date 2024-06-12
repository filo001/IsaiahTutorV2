import AdminCourseView from "../components/adminCourseView"
import AdminStudentView from "../components/adminStudentView"

function Admin() {
    return (
        <>
            <AdminStudentView />
            <AdminCourseView />
        </>
    )
}

export default Admin