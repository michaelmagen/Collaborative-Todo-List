import Alert from 'react-bootstrap/Alert';

const AlertMessage = ({message, variant}) => (
  <Alert variant={variant}> 
    {message}
  </Alert>
)

export default AlertMessage