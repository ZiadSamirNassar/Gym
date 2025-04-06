
import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Form, 
  Button, 
  FormCheck 
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Login</h2>
              <Form >
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="rememberMe">
                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                  />
                </Form.Group> */}

                <Button variant="primary" type="submit" className="w-100">
                  Sign in
                </Button>
              </Form>

              <div className="mt-3 text-center">
                <p>Don't have an account? <a href="/signup">Sign up</a></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;