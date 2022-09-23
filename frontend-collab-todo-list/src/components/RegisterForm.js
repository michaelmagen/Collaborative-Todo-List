const RegisterForm = (props) => (
  <>
  <form onSubmit={props.handleRegistration}>
    <div>
      full name
        <input
        type="test"
        value={props.name}
        name="Password"
        onChange={({ target }) => props.setName(target.value)}
      />
    </div>
    <div>
      username
        <input
        type="text"
        value={props.username}
        name="Username"
        onChange={({ target }) => props.setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={props.password}
        name="Password"
        onChange={({ target }) => props.setPassword(target.value)}
      />
    </div>
    <button type="submit">Create Account</button>
  </form>      
  <button onClick={() => props.setCreateUser(false)}> Login instead</button>
  </>
)

export default RegisterForm