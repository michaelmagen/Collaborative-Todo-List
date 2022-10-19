import Alert from 'react-bootstrap/Alert';

const AlertMessage = ({message, variant}) =>  {
  if (message === '' || variant === '') {
    return
  }
  return (
    <Alert variant={variant}> 
      {message}
    </Alert>
)
}

export default AlertMessage