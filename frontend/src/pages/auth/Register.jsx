import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import Topimg from '../../shared/Topimg';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    age: '',
    plan: 'Basic',  // Default membership plan
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation (example)
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5281/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setError('');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          username: '',
          password: '',
          age: '',
          plan: 'Basic',
        });
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to register. Please try again later.');
    }
  };

  return (
    <>
      <Topimg />
      <Container className="d-grid gap-2 mt-5">
        <h2 className="text-center mb-4">Register</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">Registration successful!</Alert>}
        <Form onSubmit={handleSubmit}>
          {/* First Name */}
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Last Name */}
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3" controlId="email">
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Username */}
          <Form.Group className="mb-3" controlId="username">
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3" controlId="password">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="age">
         <Form.Control
              type="number"
              placeholder="Enter age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="13" // Restricts the input to be 13 or higher
             />
        </Form.Group>

          {/* Plan Selection */}
          {/* <Form.Group className="mb-3" controlId="plan">
            <Form.Control
              as="select"
              name="plan"
              value={formData.plan}
              onChange={handleChange}
            >
              <option value="Basic">Basic</option>
              <option value="Gold">Gold</option>
              <option value="Premium">Premium</option>
            </Form.Control>
          </Form.Group> */}

          <Button variant="primary" type="submit" className="w-100">
            Register
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Register;
