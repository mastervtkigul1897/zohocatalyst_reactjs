import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface CreateModalProps {
  createName: string;
  createAge: number;
  showCreateModal: boolean;
  handleCloseCreateModal: () => void;
  handleCreateClick: () => void;
  setCreateName: (value: string) => void;
  setCreateAge: (value: number) => void;
}

const CreateModal: React.FC<CreateModalProps> = (props) => {
  const {
    createName,
    createAge,
    showCreateModal,
    handleCloseCreateModal,
    handleCreateClick,
    setCreateName,
    setCreateAge
  } = props;

  return (
    <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>Name:</label>
        <input className="form-control" type="text" value={createName} onChange={(e) => setCreateName(e.target.value)} />
        <label>Age:</label>
        <input className="form-control" type="number" value={createAge} onChange={(e) => setCreateAge(parseInt(e.target.value, 10))} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseCreateModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateClick}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateModal;
