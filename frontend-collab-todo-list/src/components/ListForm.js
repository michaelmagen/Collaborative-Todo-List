import {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import FloatingLabel from 'react-bootstrap/FloatingLabel';


const  ListForm = ({handleListAddition, newList, setNewList}) => {
  const [show, setShow] = useState(false)
  
  // when form is submited list is added and the modal is closed
  const submitForm = () => {
    handleListAddition()
    setShow(false)
  }

  return (
    <>
      <Button variant="primary" onClick={ () => setShow(true) }>
        Create New List
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <FloatingLabel
                controlId="floatingInput"
                label="List Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  defaultValue={newList}
                  onChange={(target) => {setNewList(target.target.value)}}
                  placeholder="List"
                  autoFocus
                />
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={submitForm}>
            Create List
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ListForm