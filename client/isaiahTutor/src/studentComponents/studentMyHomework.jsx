import { useContext } from "react"
import { UserContext } from "../components/context"
import MyHomeworkMain from "./myHomeworkComponents/myHomeworkMain"

function StudentMyHomework () {

    return (
        <>
        <div className="w-100 p-2 bg-light rounded user-select-none">
            <MyHomeworkMain />
        </div>
        </>
    )
}

export default StudentMyHomework