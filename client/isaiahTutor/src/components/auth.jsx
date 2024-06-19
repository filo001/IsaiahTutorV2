import axios from 'axios'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'

function Auth ({ setUser, setAuthSession }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState({msg: '', variant: ''})
    const [loading, setLoading] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        handleAuth()
    }

    function handleSuccess(response) {
        setUser(response.userObj)
        setAuthSession(1)
        sessionStorage.setItem("authTok", 1)
        // Setting session token and validating user

        // TODO: SET CURRENT SESSION TO CURRENT USER
    }

    function handleConnectionFail(error) {
        setLoading(false)
        console.log(error)
        setMessage({msg: 'Server Connection is currently down', variant: 'danger'})
    } 

    const handleAuth = async() => {
        const data = {
            user: username,
            pass: password
        }
        await axios.post(`${import.meta.env.VITE_ENDPOINT}/auth`, data)
        .then(res => {
            setLoading(false)
            if (res.data.auth) {
                // User + Pass combination is valid
                handleSuccess(res.data)
            }
            else {
                // User + Pass combination is invalid
                setMessage({msg: res.data.message, variant: 'danger'})
            }
        })
        .catch(error => handleConnectionFail(error)) // Database cant connect
    }

    return (
        <div className='container-fluid d-flex flex-column align-items-center justify-content-center '>
            <form action="POST" >
                <label className='form-label mt-2'>Username</label>
                <input className='form-control' type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label className='form-label mt-2'>Password</label>
                <input className='form-control' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div>
                    <Button type='submit' onClick={handleSubmit} className='w-100 p-1 mt-4'>Login</Button>
                </div>
            </form>
            {loading && <div className='mt-3 spinner-border text-primary' role='status'></div>}
                <div className={'mt-3 alert alert-' + message.variant}>{message.msg}</div>
        </div>
    )
}

export default Auth