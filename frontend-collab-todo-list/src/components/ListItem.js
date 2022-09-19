const ListItem = ({item, handleCheckbox}) => (
  <>
    <input type="checkbox" onClick={ handleCheckbox }></input>
    {item.content}
  </>
)

export default ListItem