import axios from 'axios'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'

function Auth ({ setUser, setAuthSession }) {
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
                console.log("logging in") // handle success here
                setUser(res.data.userObj)
                setAuthSession(1)
                sessionStorage.setItem("authTok", 1)
                // Setting session token and validating user

                // TODO: SET CURRENT SESSION TO CURRENT USER
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='container-fluid d-flex align-items-center justify-content-center min-vh-100'>
            <form action="POST" >
                <p className='mt-2'>Username</p>
                <input className='form-control' type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <p className='mt-2'>Password</p>
                <input className='form-control' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div>
                    <Button type='submit' onClick={handleSubmit} className='w-100 p-1 mt-4'>Login</Button>
                </div>
                <p>{message}</p>
            </form>
        </div>
    )
}

export default Auth