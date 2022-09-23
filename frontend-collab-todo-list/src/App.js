import { useState, useEffect } from 'react'
import LoginForm from "./components/LoginForm"
import loginService from "./services/login"
import listService from './services/lists'
import userService from './services/users'
import ListDirectory from './components/ListDirectory'
import List from './components/List'
import RegisterForm from './components/RegisterForm'



function App() {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [lists, setLists] = useState(null)
  const [activeList, setActiveList] = useState(null)
  const [newItem, setNewItem] = useState('')
  const [newList, setNewList] = useState('')
  const [createUser, setCreateUser] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedListappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      listService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const populateLists = async () => {
      const userWithLists = await userService.getUser(user.username)
      setLists(userWithLists[0].lists)
      if (userWithLists[0].lists.length === 0)
        return 
      const list = await listService.getList(userWithLists[0].lists[0].id)
      setActiveList(list)
    }
    if (user != null) {
      populateLists()
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedListappUser', JSON.stringify(user)
      ) 

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      /// TODO: error message
      console.log('Wrong credentials')
      setTimeout(() => {
        console.log('display some error message');
      }, 5000)
    }
  }

  const handleRegistration = async (event) => {
    event.preventDefault()
    try {
      const newUser = await userService.createUser({
        username, name, password
      })
      console.log(newUser)

      // log the user in 
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedListappUser', JSON.stringify(user)
      ) 

      setUser(user)
      setUsername('')
      setPassword('')
      setName('')
    } catch(exception) {
      console.log('not able to create user')
    }
  }

  const handleListChange = async (e) => {
    if (e.target.value === 'none') {
      return
    }
    const newList = await listService.getList(e.target.value)
    setActiveList(newList)
  }

  const handleCheckbox = async (event) => {
    console.log('clicked on the check box')
    console.log(event.target.value)
    try {
      setTimeout( async () =>  {
        await listService.deleteItem(event.target.value)
        const newListItems = activeList.items.filter(list => list.id !== event.target.value)
        const newActiveList = {...activeList, items: newListItems}
        setActiveList(newActiveList)
        console.log('the list items are now', newActiveList);
      }, 1000)
    } catch(exception) {
      /// TODO: SHOW ERROR TO THE USER
      console.log(exception)

    }
  }

  const handleItemAddition = async (event) => {
    event.preventDefault()
    if (newItem === '') {
      /// TODO: error message to the user
      console.log('items in the to do list can not be empty')
      return
    }
    // pass in the new item object and the list id
    try {
      const item = {
        content: newItem
      }
      const savedItem = await listService.createItem(item, activeList.id)
      setNewItem('')

      // update the active list with the new item so that the user does not need to refresh to see a new item
      const newActiveList = { ...activeList, items: activeList.items.concat(savedItem) }
      setActiveList(newActiveList)
    } catch (exception) {
      /// TODO: error message to user
      console.log(exception);
      setNewItem('')
    }
  }

  const handleListAddition = async (event) => {
    if (newList === '') {
      /// TODO: error message to the user
      console.log('items in the to do list can not be empty')
      return
    }
    try {
      const list = {
        title: newList
      }
      const savedList = await listService.createList(list)
      setNewList('')
      
      // update the user with the new list so that there is no need to refresh
      const newLists = lists.concat(savedList)
      setLists(newLists)
    } catch (error) {
      /// TODO: error message to user
      console.log(error.response.data)
      setNewItem('')
    }
  }

  const handleLogOut = () => {
    if (user === null)
      return
    setUser(null)
    localStorage.removeItem('loggedListappUser')
  }

  return (
    <div>
      <h1>TODO List App</h1>
      {user === null ?
        createUser ? 
          <RegisterForm 
            username={username}
            password={password}
            name={name}
            setUsername={setUsername}
            setPassword={setPassword}
            setName={setName}
            handleRegistration={handleRegistration}
            setCreateUser={setCreateUser}
            /> :
          <LoginForm 
            handleLogin={handleLogin} 
            username={username} 
            password={password} 
            setPassword={setPassword} 
            setUsername={setUsername}
            setCreateUser={setCreateUser}
            /> :
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogOut}>Log Out</button>
          <ListDirectory 
            lists={lists} 
            handleListChange={handleListChange} 
            newList={newList}
            setNewList={setNewList}
            handleListAddition={handleListAddition}
            />
          <List 
            activeList={activeList} 
            handleCheckbox={handleCheckbox} 
            newItem={newItem} 
            setNewItem={setNewItem}
            handleItemAddition={handleItemAddition}
            />
        </div>
      }
    </div>
  )
}

export default App

