import { Button } from 'react-bootstrap'

function AdminCourseLessonTable ({setCurrentCourse, currentCourse, displayLessons, lessons}) {
    return (
        <>
        <div className="d-flex justify-content-between mb-3">
            <span>Showing Overview for <span style={{fontWeight:700}}>{currentCourse.name}</span></span>
            <Button className="rounded btn-danger btn-sm" onClick={() => setCurrentCourse(undefined)}>Close</Button>  
        </div>
        <table className="table table-hover">
            <thead className="thead-dark">
                <tr>
                    <th>Lesson Name</th>
                    <th>Topic</th>
                    <th>Date Created</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {lessons.map(lesson => displayLessons(lesson))}
            </tbody>
        </table>
        </>
    )
}

export default AdminCourseLessonTable