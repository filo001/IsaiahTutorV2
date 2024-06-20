import { useEffect, useState } from "react"
import { LessonsContext } from "../components/context"
import StudentMyCourses from "../studentComponents/studentMyCourses"
import StudentMyHomework from "../studentComponents/studentMyHomework"
import axios from "axios"
import StudentNotices from "../studentComponents/studentNotices"

function Student() {
    

    return (
        <div className="w-100 container">
            <div className="row">
                <div className="col">
                    <StudentMyHomework />
                </div>
                <div className="col">
                    <StudentMyCourses />
                    <StudentNotices />
                </div>
            </div>
        </div>
    )
}

export default Student