import axios from 'axios'
import { useState } from 'react'

function Auth () {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        handleAuth()
    }

    const handleAuth = async() => {
        const data = {
            user: username,
            pass: password
        }
        await axios.post('http://localhost:4000/auth', data)
        .then(res => {
            setMessage(res.data.message)
            if (res.data.auth) {
                console.log("logging in")
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <>
        <form action="POST">
            <p>Username</p>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <p>Password</p>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type='submit' onClick={handleSubmit}>Login</button>
            <p>{message}</p>
        </form>
        </>
    )
}

export default Auth