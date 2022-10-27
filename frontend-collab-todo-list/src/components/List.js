import ListItem from "./ListItem"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'


const List = ({activeList, handleCheckbox, handleItemAddition, newItem, setNewItem}) => 
{
  if (activeList === null) {
    return (<></>)
  }
  return (
  <>
    <Container>
      <Col md={10} sm={12} className='mx-auto border rounded p-3' >
        <h3 className="text-center"> { activeList.title } </h3>
        {activeList.items.map(item => (
          <div key={item.id}>
            <ListItem item={item} handleCheckbox={handleCheckbox}/>
          </div>
        ))}
        <InputGroup className="mt-3">
            <Form.Control
              placeholder="New To-do"
              value={newItem}
              onChange={ ({target}) => setNewItem(target.value)}
            />
            <Button variant="outline-success" onClick={handleItemAddition}>
              Add Item
            </Button>
        </InputGroup>
      </Col>
    </Container>
  </>

)}
export default List