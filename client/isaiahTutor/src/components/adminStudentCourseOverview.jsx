import { Button } from "react-bootstrap"

function AdminStudentCourseOverview({currentStudent}) {

    function handleEnrollment() {

    }

    function handleRemoval() {

    }

    function mapCourse(course) {
        return (
            <tr key={course}>
                <td>{course}</td>
                <td><Button onClick={handleRemoval} variant="danger" disabled>Remove</Button></td>
            </tr>
        )
    }

    return (
        <div className="mt-3 user-select-none">
            <h3>Courses Assigned</h3>
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Course Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStudent.courses.map(course => mapCourse(course))}
                </tbody>
            </table>
            <Button disabled onClick={handleEnrollment}>Enrol into new Course +</Button>
        </div>
    )
}

export default AdminStudentCourseOverview