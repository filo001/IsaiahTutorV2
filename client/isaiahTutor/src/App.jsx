import Auth from './components/auth'
import Home from './pages/home'
import './app.css'
import { useEffect, useState } from 'react'
import { UserContext } from './components/context'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

function App() {
  const [user, setUser] = useState(undefined)
  const [authSession, setAuthSession] = useState(0)
  
  useEffect(()=> {
    setAuthSession(sessionStorage.getItem("authTok"))
  }, [])


  return (
    <>
      <UserContext.Provider value={user}>
          {(authSession && user != undefined) ?  <Home setAuthSession={setAuthSession} /> :<Auth setUser={setUser} setAuthSession={setAuthSession}/>}
        </UserContext.Provider>  

      {/* <button onClick={() => console.log(user)}> test </button> */}
    </>
    
  )
}

export default App
