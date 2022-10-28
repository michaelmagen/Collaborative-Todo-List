// import react, components, and boostrap
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
import ListButton from './components/ListButton'
import Container from 'react-bootstrap/Container'
import Footer from './components/Footer'
import Header from './components/Header'
import ListForm from './components/ListForm'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

function App() {
  /***************************************************/
  /****  State variables                         *****/
  /***************************************************/

  // form login/registration state
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [name, setName] = useState('')
  // site data
  const [user, setUser] = useState(null)
  const [lists, setLists] = useState(null)
  const [activeList, setActiveList] = useState(null)
  // form input state
  const [newItem, setNewItem] = useState('')
  const [newList, setNewList] = useState('')
  const [addUser, setAddUser] = useState('')
  // state for alerts 
  const [message, setMessage] = useState('')
  const [variant, setVariant] = useState('')
  const [createUser, setCreateUser] = useState(false) // to show login or registration
  const [show, setShow] = useState(false) // for popup form


  /***************************************************/
  /**** Application useEffects and handle function *****/
  /***************************************************/

  // check local storage to see if user already signed
  useEffect(() => {
    setAddUser('')
    const loggedUserJSON = window.localStorage.getItem('loggedListappUser')
    // when user info in local storage, update user state
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // set user token to be used for API requests
      listService.setToken(user.token)
    }
  }, [])

  // populate the to do lists when the user is updated
  useEffect(() => {
    const populateLists = async () => {
      const userWithLists = await userService.getUser(user.username)
      setLists(userWithLists[0].lists)
    }

    if (user != null) {
      populateLists()
    }
  }, [user])

  // show/hide functions for user add popup form
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // log in a user to application
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      // save user to local storage
      window.localStorage.setItem(
        'loggedListappUser', JSON.stringify(user)
      ) 
      // update state variables
      setUser(user)
      setUsername('')
      setPassword('')
      // after login save the token so that requests can be authenticated  
      listService.setToken(user.token)
    } catch (error) {
      displayError('Incorrect username or password. Please try again!')
    }
  }

  // add another user to a list
  const handleUserAddition = async () => {
    try {
      const username = {
        username : addUser
      }
      await listService.addListUser(activeList.id, username)
    } catch (error) {
      displayError(`${error.response.data.error}. Make sure that the username entered is correct!`)
    }
    setAddUser('')
    // close the modal when form submitted
    handleClose()
  }

  // create a new user account
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

      // save user info to local storage
      window.localStorage.setItem(
        'loggedListappUser', JSON.stringify(user)
      ) 

      // update state
      setUser(user)
      setUsername('')
      setPassword('')
      setName('')
      // save the token so that can send it to backend
      listService.setToken(user.token)
      // login form should be shown when logged out
      setCreateUser(false)
    } catch(error) {
      displayError(`${error.response.data.error}. Unable to create new user.`)
    }
  }

  // handle changing of active list
  const handleListChange = async (event) => {
    // when no list is selected, do not show a list
    if (event.target.value === 'none') {
      setActiveList(null)
      return
    }
    // get list items for selected list
    const newList = await listService.getList(event.target.value)
    setActiveList(newList)
  }

  // delete list items when checked off
  const handleCheckbox = async (event) => {
    try {
      // give a 1 sec buffer before deletion
      setTimeout( async () =>  {
        // delete the list item from database
        await listService.deleteItem(event.target.value)
        // delete item from showing in list
        const newListItems = activeList.items.filter(list => list.id !== event.target.value)
        const newActiveList = {...activeList, items: newListItems}
        setActiveList(newActiveList)
      }, 1000)
    } catch(error) {
      displayError(`${error.response.data.error}`)
    }
  }

  // handle adding to-do item to a list
  const handleItemAddition = async (event) => {
    event.preventDefault()
    if (newItem === '') {
      displayError('List item may not be empty. Unable to add list item.')
      return
    }
    try {
      const item = {
        content: newItem
      }
      const savedItem = await listService.createItem(item, activeList.id)
      setNewItem('') // clear the form 

      // update the active list with the new item so that the user does not need to refresh to see a new item
      const newActiveList = { ...activeList, items: activeList.items.concat(savedItem) }
      setActiveList(newActiveList)
    } catch (error) {
        displayError(`${error.response.data.error}`)
    }
  }

  // allow user to create a new list
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
      setNewList('') // update form input state
      
      // update the user with the new list so that there is no need to refresh
      const newLists = lists.concat(savedList)
      setLists(newLists)
      setActiveList(savedList)
    } catch (error) {
      displayError(`${error.response.data.error}`)
    }
  }

  // log user out from application
  const handleLogOut = () => {
    if (user === null)
      return
    setUser(null)
    setActiveList(null)
    localStorage.removeItem('loggedListappUser')
  }

  // delete a list 
  const handleListDeletion = async () => {
    // confirm user want to delete list, if no confirmation do nothing
    if (!window.confirm(`Delete list called ${activeList.title}?`)) {
      return 
    }
    try {
      // delete list from DB
      await listService.deleteList(activeList.id)
      // delete list from user interface
      const newLists = lists.filter(list => list.id !== activeList.id)
      setLists(newLists)
      // reset list selection to be null so no list is displayed
      setActiveList(null)
    } catch (error) {
      displayError('Unable to delete list. Please try again.')
    }
  }

  // log in user  to the demo user
  const handleDemo = async () => {
    try {
      const user = await loginService.login({
        username: 'GuestUser',
        password: '1234567'
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

  // takes in an error message. Displays error message to user and removes it after 5 seconds.
  const displayError = (message) => {
    setMessage(message)
    setVariant('danger')
      setTimeout(() => {
        setMessage('')
      }, 5000)
  }

   // show list delete button only if a list is selected
   const deleteButtonVariant = activeList == null ? '' : 'danger'

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
              handleDemo={handleDemo}
              /> :
          <>
            <Col md={8} sm={12} className='mx-auto'>
              <ListDirectory 
                lists={lists} 
                handleListChange={handleListChange} 
              />
            </Col>
            <Row className='mb-4'>
              <Col className='d-flex justify-content-end'>
                <PopupForm 
                  show={show} 
                  handleClose={handleClose} 
                  handleShow={handleShow} 
                  addUser={addUser} 
                  handleUserAddition={handleUserAddition}
                  setAddUser={setAddUser}
                  activeList={activeList}
                />
              </Col>
              <Col className='d-flex justify-content-center'>
                <ListForm 
                    handleListAddition={handleListAddition}
                    newList={newList}
                    setNewList={setNewList}
                    className='justify-content-end'
                />
              </Col>
              <Col className='d-flex justify-content-right'>
                <ListButton 
                  onClick={handleListDeletion} 
                  variant={deleteButtonVariant} 
                  text='Delete List' 
                />
              </Col>
            </Row>
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

