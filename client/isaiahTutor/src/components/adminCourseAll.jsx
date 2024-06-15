import { useContext, useEffect, useState } from "react"
import { CourseContext } from "./context"
import { Button, Card, Modal } from "react-bootstrap"

function AdminCourseAll ({ setCurrentCourse, fetchCourses, setSelected }) {
    // const [adding, setAdding] = useState(false) add this later
    const courses = useContext(CourseContext)

    function handleItem(course) {
        return (
            <tr key={course._id}>
                <td><a href="#" onClick={() => setCurrentCourse(course)}>{course.name}</a></td>
                <td><Button variant="secondary" onClick={() => setSelected(course)}>Add Lesson</Button></td>
            </tr>
        )
    }

    return (
        <>
            <h2>Courses Overview</h2>
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Course Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {courses.map(course => {
                    return handleItem(course)
                })}
                </tbody>                
            </table>
            {/* <Button onClick={() => setAdding(true)}>Add New Course +</Button> Addthis feature later */}
        </>
    )
}

export default AdminCourseAll