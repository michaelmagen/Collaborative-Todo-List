import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'

const RegisterForm = (props) => (
  <>
    <Stack gap={2} className="col-md-5 mx-auto">
      <Form>
        <Form.Group className='m-2'>
          <Form.Label>Full Name</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='First Last' 
            value={props.name} 
            onChange={({target}) => props.setName(target.value)} 
          />
        </Form.Group>
        <Form.Group className="m-2">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="username" 
            value={props.username} 
            onChange={({target}) => props.setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group className="m-2" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            value={props.password} 
            onChange={({target}) => props.setPassword(target.value)}
          />
        </Form.Group>
      </Form>
      <Button onClick={props.handleRegistration} className='m-1 mx-auto w-75' variant='primary'>
        Create Account
      </Button>
      <Button onClick={() => props.setCreateUser(false)} className='m-1 mx-auto w-75' variant='outline-secondary'>
        Back to Sign in
      </Button>
    </Stack>
  </>
)
export default RegisterForm