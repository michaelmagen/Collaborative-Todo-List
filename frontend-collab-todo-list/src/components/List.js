import ListItem from "./ListItem"

// const List = ({ title, listItems, handleCheckbox }) => {
//   if (title === null || listItems === null) {
//     return (<></>)
//   }
//   return (
//   <>
//     <h3> { title } </h3>
//     {listItems.map(item => (
//       <ListItem content={item} handleCheckbox={handleCheckbox} />
//     ))}
//   </>
// )}

const List = ({activeList, handleCheckbox, handleItemAddition, newItem, setNewItem}) => 
{
  if (activeList === null) {
    return (<></>)
  }
  return (
  <>
    <h3> { activeList.title } </h3>
    {activeList.items.map(item => (
      <div key={item.id}>
         <ListItem item={item} handleCheckbox={handleCheckbox}/>
      </div>
    ))}
    <input 
      type="text"
      value={newItem}
      onChange={({ target }) => setNewItem(target.value)}
      />
    <button onClick={handleItemAddition}> Add </button>
  </>
)}
export default List