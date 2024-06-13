import { UserContext } from "../components/context"
import { useContext } from "react"
import Admin from "./admin"
import Student from "./student"
import Welcome from "../components/welcome"
import Button from "react-bootstrap/esm/Button"

function Home({setAuthSession}) {

    const user = useContext(UserContext)

    return (
        <div className="container-fluid w-100 d-flex flex-column p-3 align-items-center min-vh-100 gap-5">
            <Welcome />
            {user.admin ? <Admin /> : <Student/>}
            <Button onClick={() => setAuthSession(0)} className="">Log out</Button>
        </div>
       
    )
}

export default Home