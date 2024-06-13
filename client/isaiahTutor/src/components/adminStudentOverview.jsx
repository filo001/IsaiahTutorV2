import Button from "react-bootstrap/esm/Button"

function AdminStudentOverview({currentStudent, setCurrentStudent}) {
    
    function handleClose () {
        setCurrentStudent(undefined)
    }

    return (
        <>
        <div className="d-flex justify-content-between">
            <span>Showing <span style={{fontWeight:700}}>{currentStudent.name}</span>'s Overview</span>
            <Button className="rounded btn-danger btn-sm" onClick={handleClose}>Close</Button>  
        </div>
        
        </>
    )
}

export default AdminStudentOverview