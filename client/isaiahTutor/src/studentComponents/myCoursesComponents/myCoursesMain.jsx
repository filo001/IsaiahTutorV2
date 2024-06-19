import { useContext } from "react"
import { CourseContext, UserContext } from "../../components/context"
import { Button } from "react-bootstrap"

function MyCoursesMain({setShowCourse}) {

    const courses = useContext(CourseContext)
    const user = useContext(UserContext)

    function mapCourse(course) {
        if (!user.courses.includes(course.name)) {
            return
        }

        return (
            <tr key={course._id}>
                <td>{course.name}</td>
                <td><Button onClick={() => setShowCourse(course)}>View Lessons</Button></td>
            </tr>
        )
    }

    return (
        <>
        <h2>MyCourses</h2>
        <h5 className="mt-3">Current Courses</h5>
        <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Course Name</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => mapCourse(course))}
                </tbody>                
            </table>
        </>
    )
}

export default MyCoursesMain