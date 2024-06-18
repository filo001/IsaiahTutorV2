import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { CourseContext } from "./context"

function AdminStudentAssignHW ({assignedStudent, setAssignedStudent, fetchStudentData, fetchCourses}) {
    const [course, setCourse] = useState('')
    const [lesson, setLesson] = useState(undefined)
    const [lessonList, setLessonList] = useState([])
    const courses = useContext(CourseContext)
    const [homework, setHomework] = useState({name: '', lessonID: lesson, feedback: '', score: -1, maxScore: 0, feedbackViewed: false, marked: false, studentSubmission: false, course: ''})
    const [error, setError] = useState({msg: '', variant: ''})

    useEffect(() =>{
        if (course.length) {
            const selectedCourseObject = courses.filter(c => c.name == course)[0]
            setLessonList(selectedCourseObject.lessons)
        }
        return (() => {
            fetchStudentData()
            fetchCourses()
        })
    }, [course])

    function convertLesson(lessonID) {
        return courses.filter(c => c.name == course)[0].lessons.filter(l => l.lessonID == lessonID)[0]
    }

    function validateLesson(lessonID) {
        // return whether the current lessonid is inside the current homework lesson id's
        const currentHomeworkIDs = assignedStudent.homework.map(currentHW => (currentHW !== null) ? currentHW.lessonID : undefined)
        console.log(currentHomeworkIDs)
        return currentHomeworkIDs.includes(lessonID)
    }

    async function assignLesson() {
        const currentLesson = convertLesson(lesson)
        if (validateLesson(lesson)) {
            setError({msg: 'Student already has this lesson', variant: 'danger'})
            return
        } 
        const payLoad = {...homework, name: currentLesson.name, lessonID: currentLesson.lessonID, course:course, submissionEmbed: '', feedbackEmbed: ''}
        await axios.post(`${import.meta.env.VITE_ENDPOINT}/assignHomework`, [payLoad, assignedStudent.name, assignedStudent.homework]).then(
            res => setError(res.data)
        ).catch(err => {
            setError({msg: 'An error occurred while assigning homework', variant: 'danger'})
            console.log(err)
        })
    }

    return (
        <>
        <div className="d-flex justify-content-between p-2">
            <p>Assign Homework for <b>{assignedStudent.name}</b></p>
            <Button variant="danger" onClick={() => setAssignedStudent(undefined)}>Close</Button>
        </div>
        <div className="container">
            {/* Selecting course */}
            <label className="form-label">Select Course</label>
            <select className="form-select" value={course} onChange={(e) => setCourse(e.target.value)} >
                <option value="" >(Course)</option>
                {assignedStudent.courses.map(course => {
                    return (
                        <option key={course + 'hw'} value={course}>{course}</option>
                    )
                })}
            </select>
            {/* Selecting Lesson */}
            {Boolean(course.length) && 
            <>
            <label className="form-label">Select Lesson</label>    
            <select className="form-select" value={lesson} onChange={(e) => setLesson(e.target.value)}>
                <option value='' >(Lesson)</option>
                {lessonList.map(lesson => {
                    if (validateLesson(lesson.lessonID)) {
                        return
                    }
                    return (
                        <option key={lesson.lessonID + 'hw'} value={lesson.lessonID}>{lesson.name}</option>
                    )
                })}
            </select>
            </>}
            {Boolean(lesson) &&
            <div className="form-group d-flex mt-2 flex-column">
            <label className="form-label">Input Max Score for this lesson: {homework.maxScore}</label>
            <input onChange={e => setHomework({...homework, maxScore: e.target.value})} value={homework.maxScore} type="range" className="form-control-range" min='0' max='15' step='1' />
            <Button onClick={assignLesson} variant="success mt-3" disabled={error.variant === 'success'}>Assign Lesson</Button>
            </div>}
            <div className={"mt-3 alert alert-" + error.variant}>{error.msg}</div>
        </div>
        </>
    )
}

export default AdminStudentAssignHW