import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TableComponent.css'; // Import the CSS file
import { Button, Modal } from 'react-bootstrap';
import Data from './Data';
import EditModal from './EditModal';
import ViewModal from './ViewModal';
import CreateModal from './CreateModal';

const TableComponent: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [selectedItem, setSelectedItem] = useState<Data | null>(null);
  const [editName, setEditName] = useState<string>('');
  const [editAge, setEditAge] = useState<number>(0);
  const [createName, setCreateName] = useState<string>('');
  const [createAge, setCreateAge] = useState<number>(0);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/server/marvinplayground_function/getall');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleViewClick = async (item: Data) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  const handleEditClick = (item: Data) => {
    setSelectedItem(item);
    setEditName(item.Name);
    setEditAge(item.Age);
    setShowEditModal(true);
  };

  const handleEditSave = () => {
    if (selectedItem) {
      // Create the request body with the updated values
      const requestBody = {
        Name: editName,
        Age: editAge,
      };

      // Send the PUT request with the request body
      fetch(`http://localhost:3000/server/marvinplayground_function/datastore/${selectedItem.ROWID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then(response => {
          if (response.ok) {
            // Handle the successful edit
            console.log('Data edited successfully.');
            fetchData(); // Fetch data again to update the table
          } else {
            throw new Error('Error editing data.');
          }
        })
        .catch(error => console.error('Error:', error));

      // Clear the selected item and input fields
      setSelectedItem(null);
      setEditName('');
      setEditAge(0);
      setShowEditModal(false);
    }
  };

  const handleDeleteClick = (id: any) => {
    // Logic for handling the delete functionality
    console.log(`Delete data with ID: ${id}`);
    // You can send a delete request to the endpoint for deleting the data
    fetch(`http://localhost:3000/server/marvinplayground_function/datastore/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          // Handle the successful deletion
          console.log('Data deleted successfully.');
          fetchData(); // Fetch data again to update the table
        } else {
          throw new Error('Error deleting data.');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleCreateClick = () => {
    // Create the request body with the new data
    const requestBody = {
      Name: createName,
      Age: createAge,
    };

    // Send the POST request with the request body
    fetch('http://localhost:3000/server/marvinplayground_function/datastore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => {
        if (response.ok) {
          // Handle the successful creation
          console.log('Data created successfully.');
          fetchData(); // Fetch data again to update the table
          setCreateName(''); // Clear the create input fields
          setCreateAge(0);
          setShowCreateModal(false);
        } else {
          throw new Error('Error creating data.');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
  };

  return (
    <div className="container">
      <br />
      <h1 className="text-center">ZOHO CATALYST + REACT JS + BOOTSTRAP</h1>
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.ROWID}>
              <td>{item.ROWID}</td>
              <td>{item.Name}</td>
              <td>{item.Age}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEditClick(item)}>Edit</button> &nbsp;
                <button className="btn btn-danger" onClick={() => handleDeleteClick(item.ROWID)}>Delete</button> &nbsp;
                <button className="btn btn-secondary" onClick={() => handleViewClick(item)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <EditModal
        selectedItem={selectedItem}
        editName={editName}
        editAge={editAge}
        showEditModal={showEditModal}
        handleCloseEditModal={handleCloseEditModal}
        handleEditSave={handleEditSave}
        setEditName={setEditName}
        setEditAge={setEditAge}
      />

      <ViewModal
        selectedItem={selectedItem}
        showViewModal={showViewModal}
        handleCloseViewModal={handleCloseViewModal}
      />

      <br /><br />
      <div>
        <h2>Create Data</h2>
        <label>Name:</label>
        <input className="form-control" type="text" value={createName} onChange={(e) => setCreateName(e.target.value)} />
        <label>Age:</label>
        <input className="form-control" type="number" value={createAge} onChange={(e) => setCreateAge(parseInt(e.target.value, 10))} /><br />
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>Create</button>
      </div>

      <CreateModal
        createName={createName}
        createAge={createAge}
        showCreateModal={showCreateModal}
        handleCloseCreateModal={handleCloseCreateModal}
        handleCreateClick={handleCreateClick}
        setCreateName={setCreateName}
        setCreateAge={setCreateAge}
      />

      <br /><br />
    </div>
  );
};

export default TableComponent;
