import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const TrainersTable = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [currentTrainer, setCurrentTrainer] = useState(null);
  const [formMode, setFormMode] = useState("add"); // or "edit"

  const initialForm = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    specialization: '',
    experience: '',
    role: 'Trainer'
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchTrainers = async () => {
    try {
      const response = await fetch('http://localhost:5281/api/trainers/all');
      const data = await response.json();
      setTrainers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this trainer?")) return;

    try {
      await fetch(`http://localhost:5281/api/trainers/delete/${id}`, {
        method: 'DELETE'
      });
      setTrainers(trainers.filter(t => t.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleShowMore = (trainer) => {
    setCurrentTrainer(trainer);
    setShowMoreModal(true);
  };

  const handleEdit = (trainer) => {
    setFormMode("edit");
    setCurrentTrainer(trainer);
    setFormData({ ...trainer });
    setShowModal(true);
  };

  const handleAdd = () => {
    setFormMode("add");
    setFormData(initialForm);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url =
        formMode === "add"
          ? 'http://localhost:5281/api/trainers/add'
          : `http://localhost:5281/api/trainers/update/${currentTrainer.id}`;

      const method = formMode === "add" ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Error submitting trainer');

      await fetchTrainers();
      setShowModal(false);
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ width: "70%", marginTop: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "15px" }}>ALL TRAINERS</h2>
      <Button variant="success" onClick={handleAdd} style={{ marginBottom: "15px" }}>Add Trainer +</Button>

      <Table striped hover bordered>
        <thead>
          <tr>
            <th style={{ width: '3%' }}>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer, index) => (
            <tr key={trainer.id}>
              <td>{index + 1}</td>
              <td>{trainer.firstName} {trainer.lastName}</td>
              <td>{trainer.email}</td>
              <td style={{ display: 'flex', justifyContent: "space-evenly" }}>
                <Button variant='info' size="sm" onClick={() => handleShowMore(trainer)}>Show more</Button>
                <Button variant='danger' size="sm" onClick={() => handleDelete(trainer.id)}>Delete</Button>
                <Button variant='success' size="sm" onClick={() => handleEdit(trainer)}>Update</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add / Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{formMode === "add" ? "Add Trainer" : "Edit Trainer"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-2">
              <Form.Label>First Name</Form.Label>
              <Form.Control value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Username</Form.Label>
              <Form.Control value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required={formMode === "add"} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Specialization</Form.Label>
              <Form.Control value={formData.specialization} onChange={(e) => setFormData({ ...formData, specialization: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Experience (years)</Form.Label>
              <Form.Control type="number" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Role</Form.Label>
              <Form.Control value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">{formMode === "add" ? "Add" : "Update"}</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Show More Modal */}
      <Modal show={showMoreModal} onHide={() => setShowMoreModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Trainer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentTrainer && (
            <>
              <p><strong>Name:</strong> {currentTrainer.firstName} {currentTrainer.lastName}</p>
              <p><strong>Email:</strong> {currentTrainer.email}</p>
              <p><strong>Username:</strong> {currentTrainer.username}</p>
              <p><strong>Password:</strong> {currentTrainer.password}</p>
              <p><strong>Specialization:</strong> {currentTrainer.specialization}</p>
              <p><strong>Experience:</strong> {currentTrainer.experience} years</p>
              <p><strong>Role:</strong> {currentTrainer.role}</p>
              
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMoreModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TrainersTable;
