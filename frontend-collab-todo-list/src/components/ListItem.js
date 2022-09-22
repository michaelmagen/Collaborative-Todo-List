const ListItem = ({item, handleCheckbox}) => (
  <>
    <input type="checkbox" onClick={ handleCheckbox } value={item.id}></input>
    {item.content}
  </>
)

export default ListItem