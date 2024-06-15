import Auth from './components/auth'
import Home from './pages/home'
import './app.css'
import { useEffect, useState } from 'react'
import { UserContext } from './components/context'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Nav } from 'react-bootstrap'

function App() {
  const [user, setUser] = useState(undefined)
  const [authSession, setAuthSession] = useState(0)
  
  useEffect(()=> {
    setAuthSession(sessionStorage.getItem("authTok"))
  }, [])


  return (
    <>
    <header className='custom-isaiah-header'>IsaiahTutorV2</header>
      <UserContext.Provider value={user}>
          {(authSession && user != undefined) ?  <Home setAuthSession={setAuthSession} /> :<Auth setUser={setUser} setAuthSession={setAuthSession}/>}
      </UserContext.Provider>  
    </>
    
  )
}

export default App
