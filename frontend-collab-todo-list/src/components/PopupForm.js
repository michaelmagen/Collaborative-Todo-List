import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import FloatingLabel from 'react-bootstrap/FloatingLabel';


const  PopupForm = ({show, handleShow, handleClose, addUser, handleUserAddition, setAddUser, activeList}) => {
  if (activeList === null) {
    return
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add List User
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User to List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  defaultValue={addUser}
                  onChange={(target) => {setAddUser(target.target.value)}}
                  placeholder="username"
                  autoFocus
                />
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleUserAddition}>
            Add to List
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PopupForm