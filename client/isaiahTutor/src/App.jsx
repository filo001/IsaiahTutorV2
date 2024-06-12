import Auth from './components/auth'
import UserContext from './components/context'
import Home from './pages/home'
import './app.css'
import { useEffect, useState } from 'react'

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

      {/* <button onClick={() => console.log(authSession)}> test </button> */}
    </>
    
  )
}

export default App
