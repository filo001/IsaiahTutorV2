import Auth from './components/auth'
import { UserContext, StudentContext } from './components/context'
import Home from './pages/home'
import './app.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [user, setUser] = useState(undefined)
  const [students, setStudents] = useState([])
  const [authSession, setAuthSession] = useState(0)

  async function fetchStudentData(){
    // Fetch all students array
    await axios.get('http://localhost:4000/students')
    .then(res => {
        console.log("Students Found")
        setStudents(res.data)
    })
    .catch(err => console.log(err))
}
  
  useEffect(()=> {
    setAuthSession(sessionStorage.getItem("authTok"))
    fetchStudentData()
  }, [])


  return (
    <>
    <StudentContext.Provider value={students}>
      <UserContext.Provider value={user}>
          {(authSession && user != undefined) ?  <Home setAuthSession={setAuthSession} /> :<Auth setUser={setUser} setAuthSession={setAuthSession}/>}
        </UserContext.Provider>
    </StudentContext.Provider>
      

      {/* <button onClick={() => console.log(user)}> test </button> */}
    </>
    
  )
}

export default App
