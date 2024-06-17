import { StatusContext, UserContext } from "../components/context"
import { useCallback, useContext, useEffect, useState } from "react"
import Admin from "./admin"
import Student from "./student"
import Welcome from "../components/welcome"
import Button from "react-bootstrap/esm/Button"
import axios from "axios"

function Home({setAuthSession}) {

    const user = useContext(UserContext)
    const [status, setStatus] = useState({msg: 'Checking server status', variant:'info'})
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        checkStatus()
        const key = setInterval(() => checkStatus(), (1000 * 60 * 10)) 
        return () => clearInterval(key)
    }, [])

    async function checkStatus() {
        const res = await axios.get(`${import.meta.env.VITE_ENDPOINT}/checkStatus`)
        setStatus(res.data)
    } 

    async function handleRefresh() {
        setRefresh(!refresh)
        await checkStatus().then(() => setRefresh(false)).catch((err) => {
            console.log(err)
            window.location.reload()
    })
    }


    return (
        <div className="container-fluid w-100 d-flex flex-column p-3 align-items-center min-vh-100 gap-5">
            <Welcome />
            <StatusContext.Provider value={status} >
            {!refresh && user.admin ? <Admin /> : <Student/>}
            <div className={"alert alert-" + status.variant }>{status.msg}</div>
            </ StatusContext.Provider >
            <div className="d-flex flex-column gap-3" >
            <Button onClick={handleRefresh}> Refresh page</Button>
            <Button onClick={() => setAuthSession(0)} className="btn-outline-danger btn-light">Log out</Button>
            </div>
        </div>
       
    )
}

export default Home