import Topimg from '../../shared/Topimg'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



const Register = () => {
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

export default Register;