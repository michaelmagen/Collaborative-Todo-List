import { Github } from "react-bootstrap-icons"
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'

const Footer = () => (
    <>
      <Navbar fixed='bottom' bg="dark" variant="dark" className='p-2'>
        <Stack gap={2} direction='horizontal' className="mx-auto">
        <Navbar.Text>Created By Michael Magen</Navbar.Text>
        <a href="https://github.com/michaelmagen/Collaborative-Todo-List">
          <Button variant='light' className="rounded-pill">
            <Github size={20} ></Github>
          </Button>
        </a>
        </Stack>
      </Navbar>
      
    </>
)

export default Footer