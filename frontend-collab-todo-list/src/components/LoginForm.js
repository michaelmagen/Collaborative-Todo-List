import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

const LoginForm = ({ handleLogin, username, password, setPassword, setUsername, setCreateUser}) => (
  <>
    <Form>
      <Form.Group className="mx-auto w-50 mb-2">
        <Form.Label>Username</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="username" 
          value={username} 
          onChange={({target}) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group className="mx-auto w-50 mb-2" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={({target}) => setPassword(target.value)}
        />
      </Form.Group>
    </Form>
    <Row className='w-25 mx-auto m-4'>
      <Button onClick={handleLogin} variant='primary'>
        Sign in
      </Button>
    </Row>
    <Row className='w-25 mx-auto m-4'>
      <Button onClick={() => setCreateUser(true)} variant='outline-secondary'>
        Create Account
      </Button>
    </Row>
  </>
)

export default LoginForm