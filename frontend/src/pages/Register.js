import Topimg from '../components/Topimg'
import React from 'react';
import myimg from '../assets/images/download.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';


import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Register1 = () => {

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '900px', border: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
        <Row className="g-0">
          {/* Image Section */}
          <Col md={6} className="d-none d-md-block">
            <div 
              style={{
                backgroundImage: `url(${myimg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100%',
                minHeight: '500px',
                borderTopLeftRadius: '0.25rem',
                borderBottomLeftRadius: '0.25rem'
              }}
            >
              <div style={{
                position: 'absolute',
                bottom: '30px',
                left: '30px',
                color: 'white',
                maxWidth: '300px'
              }}>
                <h3>Join Our Community</h3>
                <p>Create your account to get started</p>
              </div>
            </div>
          </Col>

          {/* Form Section */}
          <Col md={6}>
            <Card.Body className="p-5">
              <h2 className="text-center mb-4">Sign Up</h2>
              
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 mb-3 py-2"
                  style={{ fontWeight: 'bold' }}
                >
                  Register Now
                </Button>

                <div className="text-center mt-3">
                  <p className="text-muted">Already have an account? <a href="/login" style={{ textDecoration: 'none' }}>Login here</a></p>
                </div>
              </Form>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );

  
}

export const Register2 = () => {
    return (

    <>
    <Topimg />
    
    <Container className="d-grid gap-2 mt-5" >
      <h2 className="text-center mb-4">Register</h2>
              <Form >
                <Form.Group className="mb-3" controlId="name">
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                

                <Button variant="primary" type="submit" className="w-100">
                  Register
                </Button>
              </Form>
    </Container>
    </>
  );
}