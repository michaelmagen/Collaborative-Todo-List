import { useState, useEffect } from 'react'
import LoginForm from "./components/LoginForm"
import loginService from "./services/login"
import listService from './services/lists'
import userService from './services/users'
import ListDirectory from './components/ListDirectory'
import List from './components/List'


function App() {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [lists, setLists] = useState(null)
  const [activeList, setActiveList] = useState(null)
  const [newItem, setNewItem] = useState('')
  const [newList, setNewList] = useState('')

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

  const handleListChange = async (e) => {
    if (e.target.value === 'none') {
      return
    }
    const newList = await listService.getList(e.target.value)
    setActiveList(newList)
  }

  const handleCheckbox = () => {
    console.log('clicked on the check box');
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
      console.log('error with adding item to the list');
      setNewItem('')
    }
  }

  const handleListAddition = async (event) => {
    event.preventDefault()
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
    } catch (exception) {
      /// TODO: error message to user
      console.log('error with adding a list to the user');
      setNewItem('')
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

//<List title={activeList.title}  listItems={activeList.items} handleCheckbox={handleCheckbox} />
