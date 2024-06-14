import { useContext, useEffect, useState } from "react"
import axios from "axios"
import Button from "react-bootstrap/esm/Button"
import { CourseContext } from "./context"

function AdminStudentAdd ({ setAdding, fetchStudentData, fetchCourses}) {
    const courses = useContext(CourseContext)
    const [error, setError] = useState({success: false, msg: ''})
    const [formData, setFormData] = useState({
        name: '',
        pass: '',
        courses: []
    })

    useEffect(
        () => {
            fetchCourses()
            fetchStudentData()
        }, [error]
    )

    function processCourse(course) {
        function handleCourseAdd() {
            // Adding Course Name to list
            if (formData.courses.includes(course.name)) {
                const new_array = formData.courses
                .filter(curr => curr != course.name )
                console.log(new_array)
                setFormData({...formData, courses: new_array})
            }
            else {
                setFormData({...formData, courses: [...formData.courses, course.name]})
            }
        }
        return (
            <a href="#" onClick={() => handleCourseAdd(course)} className={'d-flex justify-content-between list-group-item list-group-item-action fw-bold ' + (formData.courses.includes(course.name) ? 'list-group-item-success' : '')} key={course._id + 'ADD'}>
                {course.name}
                {formData.courses.includes(course.name) && <span className="badge bg-light text-success rounded-pill"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
</svg></span>}
            </a>
        )
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!formData.courses.length || !formData.pass || !formData.name.length) {
            setError({success: false, msg: "At least one field is not filled"})
            return
        }
        console.log(formData)
        await axios.post(`${import.meta.env.VITE_ENDPOINT}/addStudent`, formData)
        .then(res => {
            setError(res.data)
            console.log(error)

        })
        .catch(err => console.log(err))

    }

    return (
        <div className="card" >
            <form className="card-body user-select-none" onSubmit={handleSubmit}>
                <span>
                    <label>Student Name: </label>
                    <input className="form-control" type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                    <label>Password: </label>
                    <input className="form-control" type="password" value={formData.pass} onChange={(e) => setFormData({...formData, pass: e.target.value})} />
                    
                </span>
                <div>
                    <label >Courses: </label>
                    <div className="list-group">
                        {courses.map(course => {
                            return processCourse(course)
                        })}
                    </div>
                </div>
                {Boolean(error.msg) && <div className={"mt-3 alert " + (error.success ? "alert-success" : "alert-danger")}>{error.msg}</div>}
                <div className="d-flex justify-content-between mt-3">
                    <Button onClick={() => setAdding(false)}>Cancel</Button>
                    <Button variant="success" disabled={!formData.courses.length || !formData.name.length || !formData.pass.length} type='submit'>Create Student</Button>
                </div>
            </form>
            
        </div>
    )
}

export default AdminStudentAdd