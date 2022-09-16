import { useState, useEffect } from 'react'
import LoginForm from "./components/LoginForm"
import loginService from "./services/login"

function App() {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null) 

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedListappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      loginService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedListappUser', JSON.stringify(user)
      ) 

      loginService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
      setTimeout(() => {
        console.log('display some error message');
      }, 5000)
    }
  }

  return (
    <div>
      <h1>TODO List App</h1>
      {user === null ?
        <LoginForm 
            handleLogin={handleLogin} 
            username={username} 
            password={password} 
            setPassword={setPassword} 
            setUsername={setUsername}
            /> :
        <div>
          <p>{user.name} logged-in</p>
        </div>
      }
      </div>
  )
}

export default App
