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

const ListDirectory = ({lists, handleListChange}) => {
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
    </>
  )
}

export default ListDirectory