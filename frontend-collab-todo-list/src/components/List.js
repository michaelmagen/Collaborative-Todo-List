import ListItem from "./ListItem"

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
      placeholder="New List Item"
      onChange={({ target }) => setNewItem(target.value)}
      />
    <button onClick={handleItemAddition}> Add </button>
  </>
)}
export default List