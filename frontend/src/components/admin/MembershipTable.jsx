import React, { useState, useCallback } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import usePolling from '../../hooks/usePolling';

const MembershipTable = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [currentPlan, setCurrentPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    price: '',
    benefits: '',
    personalSessions: ''
  });

  const fetchPlans = useCallback(async () => {
    try {
      const authData = { 
      token: localStorage.getItem("token"),
      role: localStorage.getItem("type"),
      username: localStorage.getItem("username"),
    }
      const response = await fetch('https://localhost:7052/MembershipPlan', {
        headers: {
          'Authorization': `Bearer ${authData?.token}`
        }
      });
      const data = await response.json();
      setPlans(data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch membership plans');
    } finally {
      setLoading(false);
    }
  }, []);

  usePolling(fetchPlans, 4000);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddPlan = () => {
    setModalTitle('Add New Membership Plan');
    setFormData({
      name: '',
      duration: '',
      price: '',
      benefits: '',
      personalSessions: ''
    });
    setCurrentPlan(null);
    setShowModal(true);
  };

  const handleEditPlan = (plan) => {
    setModalTitle('Edit Membership Plan');
    setFormData({
      name: plan.name,
      duration: plan.duration,
      price: plan.price,
      benefits: plan.benefits,
      personalSessions: plan.personalSessions
    });
    setCurrentPlan(plan);
    setShowModal(true);
  };

  const handleDeletePlan = async (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        const authData = { 
      token: localStorage.getItem("token"),
      role: localStorage.getItem("type"),
      username: localStorage.getItem("username"),
    }       
          const response = await fetch(`https://localhost:7052/MembershipPlan/${planId}, {
          method: 'DELETE',
          headers: {
            'Authorization': Bearer ${authData?.token}
          }
        }`);

        if (!response.ok) {
          throw new Error('Failed to delete plan');
        }

        fetchPlans();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authData = { 
      token: localStorage.getItem("token"),
      role: localStorage.getItem("type"),
      username: localStorage.getItem("username"),
    }     
    const url = currentPlan 
        ? `https://localhost:7052/MembershipPlan/${currentPlan.planId}`
        : 'https://localhost:7052/MembershipPlan';

      const method = currentPlan ? 'PUT' : 'POST';
      
      const requestBody = {
        name: formData.name,
        duration: parseInt(formData.duration),
        price: parseFloat(formData.price),
        benefits: formData.benefits,
        personalSessions: parseInt(formData.personalSessions)
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

      fetchPlans();
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{width: "70%", marginTop: "20px"}}>
      <h2 style={{textAlign: "center", marginBottom: "15px"}}>
        MEMBERSHIP PLANS (Real-time)
      </h2>
      
      {error && <Alert variant="danger">{error}</Alert>}

      <Button 
        variant="success" 
        style={{marginBottom: "15px"}}
        onClick={handleAddPlan}
      >
        Add Membership +
      </Button>

      {loading ? (
        <div className="text-center">Loading plans...</div>
      ) : (
        <Table striped hover bordered>
          <thead>
            <tr>
              <th style={{width: '3%'}}>#</th>
              <th>Name</th>
              <th>Duration (day)</th>
              <th>Price ($)</th>
              <th>personalSessions</th>
              <th style={{textAlign: "center"}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan, index) => (
              <tr key={plan.planId || index}>
                <td>{index + 1}</td>
                <td>{plan.name}</td>
                <td>{plan.duration}</td>
                <td>{plan.price}</td>
                <td>{plan.personalSessions}</td>
                <td style={{display: 'flex', justifyContent: "space-evenly"}}>
                  <Button 
                    variant='success' 
                    size="sm"
                    onClick={() => handleEditPlan(plan)}
                  >
                    Update
                  </Button>
                  <Button 
                    variant='danger' 
                    size="sm"
                    onClick={() => handleDeletePlan(plan.planId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Plan Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duration (months)</Form.Label>
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
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Benefits</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="benefits"
                value={formData.benefits}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Personal Training Sessions</Form.Label>
              <Form.Control
                type="number"
                name="personalSessions"
                value={formData.personalSessions}
                onChange={handleInputChange}
                required
                min="0"
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button 
                variant="secondary" 
                onClick={() => setShowModal(false)} 
                className="me-2"
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {currentPlan ? 'Update Plan' : 'Add Plan'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MembershipTable;