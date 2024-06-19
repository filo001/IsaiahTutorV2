import { useEffect, useState } from "react"
import MyCoursesMain from "./myCoursesComponents/myCoursesMain"
import MyHomeworkMain from "./myHomeworkComponents/myHomeworkMain"
import { CourseContext } from "../components/context"
import MyCourseLessons from "./myCoursesComponents/myCourseLessons"
import axios from "axios"

function StudentMyCourses() {
    const [courses, setCourses] = useState([])
    const [showCourse, setShowCourse] = useState(undefined)

    useEffect(() => {
        fetchCourses()
    }, [])
    async function fetchCourses() {
        // fetch all courses into here
        await axios.get(`${import.meta.env.VITE_ENDPOINT}/courses`)
        .then(
            res => {
                setCourses(res.data)
            }
        )
    }
    return (
        <CourseContext.Provider value={courses}>
        <div className="w-100 p-2 bg-light rounded">
            {showCourse ? <MyCourseLessons course={showCourse} setCourse={setShowCourse} /> : <MyCoursesMain setShowCourse={setShowCourse} />}
        </div>
        </CourseContext.Provider>
    )
}

export default StudentMyCourses