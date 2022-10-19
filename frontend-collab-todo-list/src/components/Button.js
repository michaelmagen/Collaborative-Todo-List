import Button from 'react-bootstrap/Button'

const ListButton = ({onClick, variant, text}) => {
  if (variant === '') {
    return
  }
  return(
    <Button variant='danger' onClick={onClick}> {text} </Button>
  )
}

export default ListButton