import { Button } from "react-bootstrap"

function AdminCourseOverview({currentCourse, setCurrentCourse}) {
    return (
        <div className="d-flex justify-content-between">
            <span>Showing Overview for <span style={{fontWeight:700}}>{currentCourse.name}</span></span>
            <Button className="rounded btn-danger btn-sm" onClick={() => setCurrentCourse(undefined)}>Close</Button>  
        </div>
    )
}

export default AdminCourseOverview