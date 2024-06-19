import Auth from './components/auth'
import Home from './pages/home'
import './app.css'
import { useEffect, useState } from 'react'
import { LessonsContext, UserContext } from './components/context'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Nav } from 'react-bootstrap'

function App() {
  const [user, setUser] = useState(undefined)
  const [authSession, setAuthSession] = useState(0)
  const [lessons, setLessons] = useState([])

  useEffect(()=> {
    setAuthSession(sessionStorage.getItem("authTok"))
    fetchLessons()
  }, [])

  function isUserValid() {
    return (authSession && user != undefined) 
  }

  async function fetchLessons() {
    const lessonsArray = await axios.get(`${import.meta.env.VITE_ENDPOINT}/lessons`)
    setLessons(lessonsArray.data)
}


  return (
    <>
    <header className='custom-isaiah-header'>IsaiahTutorV2</header>
    <LessonsContext.Provider value={lessons}>
      <UserContext.Provider value={user}>
          {isUserValid() ?  <Home setAuthSession={setAuthSession} /> :<Auth setUser={setUser} setAuthSession={setAuthSession}/>}
      </UserContext.Provider>  
      </LessonsContext.Provider>
    </>
    
  )
}

export default App
