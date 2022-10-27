import ListItem from "./ListItem"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Container from 'react-bootstrap/Container'


const List = ({activeList, handleCheckbox, handleItemAddition, newItem, setNewItem}) => 
{
  if (activeList === null) {
    return (<></>)
  }
  return (
  <>
  <Container fluid='sm' className="rounded border">
    <h3 className="text-center"> { activeList.title } </h3>
    {activeList.items.map(item => (
      <div key={item.id}>
         <ListItem item={item} handleCheckbox={handleCheckbox}/>
      </div>
    ))}

    {/* <input 
      type="text"
      value={newItem}
      placeholder="New List Item"
      onChange={({ target }) => setNewItem(target.value)}
      />
    <button onClick={handleItemAddition}> Add </button> */}
    <InputGroup className="mt-3 mb-3 w-75 mx-auto">
      <Form.Control
        placeholder="New To-do"
        value={newItem}
        onChange={ ({target}) => setNewItem(target.value)}
      />
      <Button variant="outline-success" onClick={handleItemAddition}>
        Add To List
      </Button>
    </InputGroup>
    </Container>
  </>

)}
export default List