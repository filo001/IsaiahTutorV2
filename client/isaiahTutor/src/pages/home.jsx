import { UserContext } from "../components/context"
import { useContext } from "react"
import Admin from "./admin"
import Student from "./student"
import Welcome from "../components/welcome"

function Home({setAuthSession}) {

    const user = useContext(UserContext)

    return (
        <>
            <Welcome />
            {user.admin ? <Admin /> : <Student/>}
            <button onClick={() => setAuthSession(0)}>Log out</button>
        </>
       
    )
}

export default Home