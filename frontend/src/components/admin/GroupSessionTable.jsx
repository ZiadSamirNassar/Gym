import React, { useState, useCallback, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import usePolling from '../../hooks/usePolling';

const GroupSessionTable = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [currentSession, setCurrentSession] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    duration: '',
    trainerId: ''
  });
  const [trainers, setTrainers] = useState([]);

  // Fetch trainers for dropdown
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch('https://localhost:7052/Trainer', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setTrainers(data.data || []);
      } catch (err) {
        setError('Could not load trainers');
      }
    };
    if (showModal) fetchTrainers();
  }, [showModal]);

  const fetchSessions = useCallback(async () => {
    try {
      const authData = { 
        token: localStorage.getItem("token"),
        role: localStorage.getItem("type"),
        username: localStorage.getItem("username"),
      }

      const response = await fetch('https://localhost:7052/Session', {
        headers: {
          'Authorization': `Bearer ${authData?.token}`
        }
      });
      const data = await response.json();
      
      if (!data.data.every(session => session.sessionId)) {
        console.error("Some Sessions Don't Have sessionId", data.data);
        throw new Error('Session data is not complete');
      }
      
      setSessions(data.data);
    } catch (err) {
      console.error('Error fetching sessions:', err);
      setError(err.message);
    }
  }, []);

  usePolling(fetchSessions, 4000);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSession = () => {
    setModalTitle('Add New Session');
    setFormData({
      name: '',
      date: '',
      time: '',
      duration: '',
      trainerId: ''
    });
    setCurrentSession(null);
    setShowModal(true);
  };

  const handleEditSession = (session) => {
    if (!session.sessionId) {
      console.error("Session doesn't have sessionId", session);
      setError('Cannot update session without ID');
      return;
    }
  
    setModalTitle('Edit Session');
    setFormData({
      name: session.name || '',
      date: session.date.split('T')[0], // Format date for date input
      time: session.time !== undefined ? String(session.time) : '', // set time as string for input
      duration: session.duration,
      trainerId: session.trainerId || ''
    });
    setCurrentSession(session);
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
      
      if (currentSession && !currentSession.sessionId) {
        throw new Error('Session ID is missing');
      }

      const url = currentSession 
        ? `https://localhost:7052/Session/${currentSession.sessionId}`
        : 'https://localhost:7052/Session';

      const method = currentSession ? 'PUT' : 'POST';

      // Format date as yyyy-mm-dd
      const dateObj = new Date(formData.date);
      const yyyy = dateObj.getFullYear();
      const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
      const dd = String(dateObj.getDate()).padStart(2, '0');
      const formattedDate = `${yyyy}-${mm}-${dd}`;

      const requestBody = {
        name: formData.name,
        date: formattedDate, // <-- formatted as yyyy-mm-dd
        time: Number(formData.time),
        duration: parseInt(formData.duration),
        trainerId: formData.trainerId ? Number(formData.trainerId) : null,
        type: "group"
      };

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

      fetchSessions();
      setShowModal(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{width: "70%", marginTop: "20px"}}>
      <h2 style={{textAlign: "center", marginBottom: "15px"}}>
        GROUP SESSIONS (Auto-refresh)
      </h2>
      
      {error && <Alert variant="danger">{error}</Alert>}

      <Button 
        variant="success" 
        style={{marginBottom: "15px"}}
        onClick={handleAddSession}
      >
        Add Session +
      </Button>

      <Table striped hover bordered>
        <thead>
          <tr>
            <th style={{width: '3%'}}>#</th>
            <th>Name</th>
            <th>Date</th>
            <th>Time (hour)</th>
            <th>Duration (min)</th>
            <th>Trainer</th>
          </tr>
        </thead>

        <tbody>
          {sessions.map((session, index) => {
            if (!session.sessionId) {
              console.error('Session without ID:', session);
              return null;
            }
            const trainerName = trainers.find(t => t.id === session.trainerId)?.name || 'N/A';
            return (
              <tr key={session.sessionId}>
                <td>{index + 1}</td>
                <td>{session.name || 'N/A'}</td>
                <td>{new Date(session.date).toLocaleDateString() || 'N/A'}</td>
                <td>{session.time !== undefined ? session.time : 'N/A'}</td>
                <td>{session.duration || 'N/A'}</td>
                <td>{trainerName}</td>
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
            <Form.Group className="mb-3">
              <Form.Label>Session Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time (hour, 24h format)</Form.Label>
              <Form.Control
                type="number"
                name="time"
                min="0"
                max="23"
                placeholder="Hour (0-23)"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration (minutes)</Form.Label>
              <Form.Control
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                required
                min="1"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Trainer</Form.Label>
              <Form.Select
                name="trainerId"
                value={formData.trainerId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a trainer</option>
                {trainers.map(trainer => (
                  <option key={trainer.trainerId} value={trainer.trainerId}>
                    {trainer.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={() => setShowModal(false)} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {currentSession ? 'Update' : 'Save'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GroupSessionTable;