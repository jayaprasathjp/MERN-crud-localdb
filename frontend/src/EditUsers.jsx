import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { ApiUrl2 } from './ApiUrl';

function EditUsers({getApi,User,id}) {
  const [show, setShow] = useState(false);
  const [currentUser, setCurrentUser] = useState(User);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const putApi=async()=>{
    await axios.patch(ApiUrl2+'/user/'+id,currentUser)
    getApi()
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    putApi()
    
    handleClose();
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
                <div className="mb-3">
                  <label htmlFor="editName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setCurrentUser({ ...currentUser, name: e.target.value });
                    }}
                    className="form-control"
                    name="name"
                    value={currentUser.name}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editRoll" className="form-label">
                    Roll
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setCurrentUser({ ...currentUser, roll: e.target.value });
                    }}
                    name="roll"
                    value={currentUser.roll}
                  />
                </div>
                
              </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"  onClick={handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUsers;