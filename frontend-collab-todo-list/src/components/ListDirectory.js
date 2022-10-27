const ListDirectory = ({lists, handleListChange, newList, setNewList, handleListAddition}) => {
  if (lists === null) {
    return (<></>)
  }
  return (
  <>
    <h3>Select List</h3> 
    <select onChange={handleListChange}>
      <option value='none'>-- SELECT A LIST --</option>
      {lists.map(list => 
        <option value={list.id} key={list.id}> {list.title} </option>)}
    </select>
    <br></br> 
  </>
  )
}

export default ListDirectory