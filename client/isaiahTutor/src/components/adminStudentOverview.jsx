function AdminStudentOverview({currentStudent, setCurrentStudent}) {
    
    function handleClose () {
        setCurrentStudent(undefined)
    }

    return (
        <div>
            <button onClick={handleClose}>X</button>
        </div>
    )
}

export default AdminStudentOverview