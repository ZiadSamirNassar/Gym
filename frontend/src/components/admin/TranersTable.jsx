import React, { useState, useCallback } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import usePolling from '../../hooks/usePolling';

const TrainersTable = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [currentTrainer, setCurrentTrainer] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    age: ''
  });

  const fetchTrainers = useCallback(async () => {
    try {
      const authData = { 
      token: localStorage.getItem("token"),
      role: localStorage.getItem("type"),
      username: localStorage.getItem("username"),
    }
      const response = await fetch('https://localhost:7052/Trainer', {
        headers: {
          'Authorization': `Bearer ${authData?.token}`
        }
      });
      const data = await response.json();
      
      // Check if all trainers have trainerId
      if (!data.data.every(trainer => trainer.trainerId)) {
        console.error("Some Trainers Don't Have trainerId", data.data);
        throw new Error('Trainer data is not complete');
      }
      
      setTrainers(data.data);
    } catch (err) {
      console.error('Error fetching trainers:', err);
      setError(err.message);
    }
  }, []);

  usePolling(fetchTrainers, 4000);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTrainer = () => {
    setModalTitle('Add New Trainer');
    setFormData({
      username: '',
      password: '',
      name: '',
      age: ''
    });
    setCurrentTrainer(null);
    setShowModal(true);
  };

const handleEditTrainer = (trainer) => {
      console.log('Editing trainer:', trainer); // أضف هذا السطر
     if (!trainer.trainerId) {
        console.error("Trainer doesn't have trainerId", trainer);
        setError('Cannot update trainer without ID');
        return;
      }

  
    setModalTitle('Edit Trainer');
    setFormData({
      username: trainer.username,
      password: '',
      name: trainer.name,
      age: trainer.age
    });
    setCurrentTrainer(trainer);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authData = { 
      token: localStorage.getItem("token"),
      role: localStorage.getItem("type"),
      username: localStorage.getItem("username"),
    }
      
      if (currentTrainer && !currentTrainer.trainerId) {
        throw new Error('Trainer ID is missing');
      }

      const url = currentTrainer 
        ? `https://localhost:7052/Trainer/${currentTrainer.trainerId}`
        : 'https://localhost:7052/Trainer';

      const method = currentTrainer ? 'PUT' : 'POST';
      
      const requestBody = currentTrainer
        ? { name: formData.name, age: parseInt(formData.age) } // PUT
        : {
            username: formData.username,
            password: formData.password,
            name: formData.name,
            age: parseInt(formData.age)
          }; // POST

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${authData?.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Operation failed');
      }

      fetchTrainers();
      setShowModal(false);
      setError(null);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    }
  };

  return (
    <div style={{width: "70%", marginTop: "20px"}}>
      <h2 style={{textAlign: "center", marginBottom: "15px"}}>
        ALL TRAINERS (Auto-refresh)
      </h2>
      
      {error && <Alert variant="danger">{error}</Alert>}

      <Button 
        variant="success" 
        style={{marginBottom: "15px"}}
        onClick={handleAddTrainer}
      >
        Add Trainer +
      </Button>

      <Table striped hover bordered>
        <thead>
          <tr>
            <th style={{width: '3%'}}>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Username</th>
            <th style={{textAlign: "center"}}>Action</th>
          </tr>
        </thead>

        <tbody>
          {trainers.map((trainer, index) => {
            if (!trainer.trainerId) {
              console.error('Trainer without ID:', trainer);
              return null;
            }
            return (
              <tr key={trainer.trainerId}>
                <td>{index + 1}</td>
                <td>{trainer.name || 'N/A'}</td>
                <td>{trainer.age || 'N/A'}</td>
                <td>{trainer.username || 'N/A'}</td>
                <td style={{display: 'flex', justifyContent: "space-evenly"}}>
                  <Button 
                    variant='success' 
                    size="sm" 
                    onClick={() => handleEditTrainer(trainer)}
                  >
                    Update
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {!currentTrainer && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required={!currentTrainer}
                  />
                </Form.Group>
              </>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
                min="18"
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={() => setShowModal(false)} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {currentTrainer ? 'Update' : 'Save'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TrainersTable;