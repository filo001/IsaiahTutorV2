import { useContext } from "react";
import { UserContext } from "./context";

function Welcome() {
    const user = useContext(UserContext)

    return (
        <div>
            <h1 className="user-select-none">Welcome {user.name}!</h1>
        </div>
    )
}

export default Welcome