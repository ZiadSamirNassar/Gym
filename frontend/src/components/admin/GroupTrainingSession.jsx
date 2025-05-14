import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const GroupTrainingSession = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // "add" or "update"
  const [selectedSession, setSelectedSession] = useState({
    id: 0,
    title: '',
    description: '',
    date: '',
    time: '',
    trainerName: ''
  });

  const fetchSessions = async () => {
    try {
      const res = await fetch('http://localhost:5281/api/grouptrainingsessions/all');
      const data = await res.json();
      setSessions(data);
    } catch (err) {
      console.error('Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedSession(prev => ({ ...prev, [name]: value }));
  };
  

  const handleAdd = () => {
    setSelectedSession({
      id: 0,
      title: '',
      description: '',
      date: '',
      time: '',
      trainerName: ''
    });
    setModalType('add');
    setShowModal(true);
  };

  const handleEdit = (session) => {
    setSelectedSession(session);
    setModalType('update');
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this session?')) return;

    await fetch(`http://localhost:5281/api/grouptrainingsessions/delete/${id}`, {
      method: 'DELETE'
    });
    fetchSessions();
  };

  const handleSubmit = async () => {
    const url = modalType === 'add'
      ? 'http://localhost:5281/api/grouptrainingsessions/add'
      : `http://localhost:5281/api/grouptrainingsessions/update/${selectedSession.id}`;

    const method = modalType === 'add' ? 'POST' : 'PUT';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedSession)
    });

    setShowModal(false);
    fetchSessions();
  };

  if (loading) return <p>Loading group training sessions...</p>;

  return (
    <div style={{ width: "85%", marginTop: "20px", marginInline: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "15px" }}>GROUP TRAINING SESSIONS</h2>
      <Button variant="success" style={{ marginBottom: "15px" }} onClick={handleAdd}>
        Add Session +
      </Button>

      <Table striped hover bordered>
        <thead>
          <tr>
            <th style={{ width: '3%' }}>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Time</th>
            <th>Trainer</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session.id}>
              <td>{session.id}</td>
              <td>{session.title}</td>
              <td>{session.description}</td>
              <td>{session.date}</td>
              <td>{session.time}</td>
              <td>{session.trainerName}</td>
              <td style={{ display: 'flex', justifyContent: "space-evenly" }}>
                <Button
                  variant='info'
                  size="sm"
                  onClick={() => alert(
                    `Title: ${session.title}\nDescription: ${session.description}\nDate: ${session.date}\nTime: ${session.time}\nTrainer: ${session.trainerName}`
                  )}
                >
                  Show more
                </Button>
                <Button
                  variant='danger'
                  size="sm"
                  onClick={() => handleDelete(session.id)}
                >
                  Delete
                </Button>
                <Button
                  variant='success'
                  size="sm"
                  onClick={() => handleEdit(session)}
                >
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add / Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === 'add' ? 'Add Session' : 'Update Session'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle" className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={selectedSession.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={selectedSession.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDate" className="mb-2">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={selectedSession.date}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formTime" className="mb-2">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={selectedSession.time}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formTrainerName" className="mb-2">
              <Form.Label>Trainer Name</Form.Label>
              <Form.Control
                type="text"
                name="trainerName"
                value={selectedSession.trainerName}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>
            {modalType === 'add' ? 'Add' : 'Update'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GroupTrainingSession;
