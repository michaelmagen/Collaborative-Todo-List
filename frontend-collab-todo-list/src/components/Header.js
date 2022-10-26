import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

const Header = ({user, handleLogout}) => (
    <>
      <Navbar fixed='top' bg="dark" variant="dark" className='p-2' expand='lg'>
        <Container>
          <Navbar.Brand>Collaborative To-do List</Navbar.Brand>
        {
          user === null ?
          <></> :
          <>
            <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
            <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-end'>
              <Nav>
                <Navbar.Text className='me-3'>
                  Signed in as:  {user.username}
                </Navbar.Text>
                <Button variant='outline-danger' onClick={handleLogout}>
                  Log Out
                </Button>
              </Nav>
            </Navbar.Collapse>
          </>
        }
        </Container>
      </Navbar>
    </>
)

export default Header