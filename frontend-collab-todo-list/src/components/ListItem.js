import Form from 'react-bootstrap/Form'

const ListItem = ({item, handleCheckbox}) => (
  <>
    <Form.Check type="checkbox" onClick={ handleCheckbox } value={item.id} label={item.content} />
  </>
)

export default ListItem