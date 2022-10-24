import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

const RegisterForm = (props) => (
  <>
    <Form>
      <Form.Group className='mx-auto w-50 mb-2'>
        <Form.Label>Full Name</Form.Label>
        <Form.Control 
          type='text' 
          placeholder='First Last' 
          value={props.name} 
          onChange={({target}) => props.setName(target.value)} 
        />
      </Form.Group>
      <Form.Group className="mx-auto w-50 mb-2">
        <Form.Label>Username</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="username" 
          value={props.username} 
          onChange={({target}) => props.setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group className="mx-auto w-50 mb-2" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password" 
          value={props.password} 
          onChange={({target}) => props.setPassword(target.value)}
        />
      </Form.Group>
    </Form>
    <Row className='w-25 mx-auto m-4'>
      <Button onClick={props.handleRegistration} variant='primary'>
        Create Account
      </Button>
    </Row>
    <Row className='w-25 mx-auto m-4'>
      <Button onClick={() => props.setCreateUser(false)} variant='outline-secondary'>
        Back to Sign in
      </Button>
    </Row>
  </>
)
export default RegisterForm