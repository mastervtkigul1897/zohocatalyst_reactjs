import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Data from './Data';

interface EditModalProps {
  selectedItem: Data | null;
  editName: string;
  editAge: number;
  showEditModal: boolean;
  handleCloseEditModal: () => void;
  handleEditSave: () => void;
  setEditName: (value: string) => void;
  setEditAge: (value: number) => void;
}

const EditModal: React.FC<EditModalProps> = (props) => {
  const {
    selectedItem,
    editName,
    editAge,
    showEditModal,
    handleCloseEditModal,
    handleEditSave,
    setEditName,
    setEditAge
  } = props;

  return (
    <Modal show={showEditModal} onHide={handleCloseEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>Name:</label>
        <input className="form-control" type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
        <label>Age:</label>
        <input className="form-control" type="number" value={editAge} onChange={(e) => setEditAge(parseInt(e.target.value, 10))} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseEditModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
