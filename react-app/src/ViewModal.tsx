import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Data from './Data';

interface ViewModalProps {
  selectedItem: Data | null;
  showViewModal: boolean;
  handleCloseViewModal: () => void;
}

const ViewModal: React.FC<ViewModalProps> = (props) => {
  const { selectedItem, showViewModal, handleCloseViewModal } = props;

  return (
    <Modal show={showViewModal} onHide={handleCloseViewModal}>
      <Modal.Header closeButton>
        <Modal.Title>View Data</Modal.Title>
      </Modal.Header>
      {selectedItem && (
        <Modal.Body>
          <label>Name:</label>
          <p>{selectedItem.Name}</p>
          <label>Age:</label>
          <p>{selectedItem.Age}</p>
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseViewModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewModal;
