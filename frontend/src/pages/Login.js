
import React from 'react';
import { 
  Container,
  Form, 
  Button, 
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {

  return (
    <Container className="d-grid gap-2 mt-5" >
      <h2 className="text-center mb-4">Login</h2>
              <Form >
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
                  Sign in
                </Button>
              </Form>
    </Container>
  );
}

export default Login;