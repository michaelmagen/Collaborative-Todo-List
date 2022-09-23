import Popup from "reactjs-popup"

const ListDirectory = ({lists, handleListChange, newList, setNewList, handleListAddition}) => {
  if (lists === null) {
    return (<></>)
  }
  return (
  <>
    <h3>Select List</h3> 
    <select onChange={handleListChange}>
      {lists.map(list => 
        <option value={list.id} key={list.id}> {list.title} </option>)}
    </select>
    <br></br> 
    <Popup trigger={<button> Create New List</button>} modal>
      {close => (
        <>
            <button className="close" onClick={close}>
              &times;
            </button>
          <input 
            type="text"
            value={newList}
            placeholder="New List"
            onChange={({ target }) => setNewList(target.value)}
          />
          <button onClick={() => {handleListAddition(); close();}}> Submit </button>
        </>
      )}
    </Popup>  
  </>
  )
}

export default ListDirectory