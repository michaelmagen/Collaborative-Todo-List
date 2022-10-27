import Form from 'react-bootstrap/Form'

const ListDirectory = ({lists, handleListChange, newList, setNewList, handleListAddition}) => {
  if (lists === null) {
    return (<></>)
  }
  return (
  <>
    <h5>Select A List</h5> 
    <Form.Select onChange={handleListChange} className='w-50'>
      <option value='none'>-- SELECT A LIST --</option>
      {lists.map(list => 
        <option value={list.id} key={list.id}> {list.title} </option>)}
    </Form.Select>
    <br></br> 
  </>
  )
}

export default ListDirectory