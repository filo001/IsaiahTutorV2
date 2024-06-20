import { useContext, useEffect, useState } from "react"
import MyHomeworkNewlyAssigned from "./myHomeworkNewlyAssigned"
import { CurrentUserContext, LessonsContext, UserContext, UserLessonMapContext } from "../../components/context"
import axios from 'axios'
import MyHomeworkSubmissions from "./myHomeworkSubmissions"

function MyHomeworkMain () {
    const userObj = useContext(UserContext)
    const lessons = useContext(LessonsContext)
    const [student, setStudent] = useState(userObj)
    const [lessonMap, setLessonMap] = useState([])
    

    useEffect(() => {
        fetchUserData()
    }, [])

    async function fetchUserData() {
        await axios.post(`${import.meta.env.VITE_ENDPOINT}/fetchStudent`, {user: userObj.name}).then((res) => {
            setStudent(res.data)
            mapLessons(res.data)
        })
        
    }

    async function mapLessons(student) {
        const map = []
        student.homework.map(hwItem => {
            if (!hwItem) {
                return
            }
            const match = lessons.filter(lesson => lesson.lessonID == hwItem.lessonID)
            map.push({lessonObject: match[0], homeworkObject: hwItem})

        })
        setLessonMap(map)
    }


    return (
        <UserLessonMapContext.Provider value={lessonMap}>
        <CurrentUserContext.Provider value={student}>
        <h2>MyHomework</h2>
        <MyHomeworkNewlyAssigned fetchUserData={fetchUserData}/>
        <MyHomeworkSubmissions fetchUserData={fetchUserData} user={student} />
        </CurrentUserContext.Provider>
        </UserLessonMapContext.Provider>
    )
}

export default MyHomeworkMain