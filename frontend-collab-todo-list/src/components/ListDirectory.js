// const ListDirectory = ({ lists, handleClick}) => (
//   <ul>
//     {lists === null ?
//     <></> :
//     lists.map(list => (
//       <li onClick={handleClick} key={list.title}> {list.title} </li>
//     ))
//     }
//   </ul>
// )

// const ListDirectory = ({ lists, handleClick}) => (
//   <>
//   {lists === null ?
//   <></> :
//   lists.map(list => (
//     <button onClick={handleClick} key={list.title}> {list.title} </button>
//   ))
//   }
// </>
// )

const ListDirectory = ({lists, handleListChange, newList, setNewList, handleListAddition}) => {
  if (lists === null) {
    return (<></>)
  }
  return (
    <>
    <h3>Select List</h3> 
    <select onChange={handleListChange}>
      {lists.map(list => 
        <option value={list.id} key={list.title}> {list.title} </option>)}
    </select>
    <br></br> 
    <input 
      type="text"
      value={newList}
      placeholder="New List Item"
      onChange={({ target }) => setNewList(target.value)}
      />
    <button onClick={handleListAddition}> Create New List </button>
    </>
  )
}

export default ListDirectory