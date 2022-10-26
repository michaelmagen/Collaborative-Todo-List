import { useState, useEffect } from 'react'
import LoginForm from "./components/LoginForm"
import loginService from "./services/login"
import listService from './services/lists'
import userService from './services/users'
import ListDirectory from './components/ListDirectory'
import List from './components/List'
import RegisterForm from './components/RegisterForm'
import PopupForm from './components/PopupForm'
import AlertMessage from './components/Alert'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import ListButton from './components/ListButton'
import Container from 'react-bootstrap/Container'
import Footer from './components/Footer'
import Header from './components/Header'

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
  // for popup form
  const [show, setShow] = useState(false)
  const [addUser, setAddUser] = useState('')
  // state for alerts
  const [message, setMessage] = useState('')
  const [variant, setVariant] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleUserAddition = async () => {
    try {
      const username = {
        username : addUser
      }
      await listService.addListUser(activeList.id,username)
    } catch (error) {
      displayError(`${error.response.data.error}. Make sure that the username entered is correct!`)
    }
    setAddUser('')
    handleClose()
  }


  useEffect(() => {
    setAddUser('')
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
      //const list = await listService.getList(userWithLists[0].lists[0].id)
      await listService.getList(userWithLists[0].lists[0].id)
      //setActiveList(list)
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
      // after login save the token so that requests can be authenticated  
      listService.setToken(user.token)
    } catch (error) {
      displayError('Incorrect username or password. Please try again!')
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
    } catch(error) {
      displayError(`${error.response.data.error}. Unable to create new user.`)
    }
  }

  const handleListChange = async (e) => {
    if (e.target.value === 'none') {
      setActiveList(null)
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
    } catch(error) {
      displayError(`${error.response.data.error}`)
    }
  }

  const handleItemAddition = async (event) => {
    event.preventDefault()
    if (newItem === '') {
      displayError('List item may not be empty. Unable to add list item.')
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
    } catch (error) {
        displayError(`${error.response.data.error}`)
    }
  }

  const handleListAddition = async (event) => {
    if (newList === '') {
      displayError('List name may not be empty. Unable to create new list.')
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
      setActiveList(savedList)
    } catch (error) {
      displayError(`${error.response.data.error}`)
    }
  }

  const handleLogOut = () => {
    if (user === null)
      return
    setUser(null)
    setActiveList(null)
    localStorage.removeItem('loggedListappUser')
  }

  const handleListDeletion = async () => {
    if (!window.confirm(`Delete list called ${activeList.title}?`)) {
      const newLists = lists.filter(list => list.id !== activeList.id)
      console.log(newLists)
      return 
    }
    try {
      await listService.deleteList(activeList.id)
      console.log(lists);
      const newLists = lists.filter(list => list.id !== activeList.id)
      setLists(newLists)
      setActiveList(null)
    } catch (error) {
      displayError('Unable to delete list. Please try again.')
    }
  }
  
  const deleteButtonVariant = activeList == null ? '' : 'danger'

  // takes in an error message. Displays error message to user and removes it after 5 seconds.
  const displayError = (message) => {
    setMessage(message)
    setVariant('danger')
      setTimeout(() => {
        setMessage('')
      }, 5000)
  }

  return (
    <div >
      <Header handleLogout={handleLogOut} user={user} />
      <Container className='mb-5 pb-3 mt-5 pt-3'>
        <AlertMessage variant={variant} message={message}></AlertMessage>
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
          <>
            <ListDirectory 
              lists={lists} 
              handleListChange={handleListChange} 
              newList={newList}
              setNewList={setNewList}
              handleListAddition={handleListAddition}
            />
            <PopupForm 
              show={show} 
              handleClose={handleClose} 
              handleShow={handleShow} 
              addUser={addUser} 
              handleUserAddition={handleUserAddition}
              setAddUser={setAddUser}
              activeList={activeList}
            />
            <ListButton 
              onClick={handleListDeletion} 
              variant={deleteButtonVariant} 
              text='Delete Current List' 
            />
            <List 
              activeList={activeList} 
              handleCheckbox={handleCheckbox} 
              newItem={newItem} 
              setNewItem={setNewItem}
              handleItemAddition={handleItemAddition}
            />
          </>
        }
      </Container>
      <Footer />
    </div>
    
  )
}

export default App

