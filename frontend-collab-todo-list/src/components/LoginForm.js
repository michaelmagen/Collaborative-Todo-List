import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'

const LoginForm = ({ handleLogin, username, password, setPassword, setUsername, setCreateUser}) => (
  <>
    <Stack gap={2} className="col-md-5 mx-auto">
      <Form>
        <Form.Group className='m-2'>
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="username" 
            value={username} 
            onChange={({target}) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className='m-2'>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={({target}) => setPassword(target.value)}
          />
        </Form.Group>
      </Form>
      <Button onClick={handleLogin} className='w-75 mx-auto' variant='primary'>
        Sign in
      </Button>
      <Button onClick={() => setCreateUser(true)} className='w-75 mx-auto' variant='outline-primary'>
        Create Account
      </Button>
    </Stack>
  </>
)

export default LoginForm