// import React, { useState } from 'react';
// import { Container, Form, Button, Alert } from 'react-bootstrap';
// import Topimg from '../../shared/Topimg';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form fields
//     if (!formData.username || !formData.password) {
//       setError('Please fill in both username and password.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5281/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Handle successful login, e.g., store token in localStorage or cookies
//         localStorage.setItem('token', data.token); // Assuming backend returns a token
//         setSuccess(true);
//         setError('');
//       } else {
//         setError(data.message || 'Invalid credentials. Please try again.');
//       }
//     } catch (err) {
//       setError('Login failed. Please try again later.');
//     }
//   };

//   return (
//     <>
//       <Topimg />
//       <Container className="d-grid gap-2 mt-5">
//         <h2 className="text-center mb-4">Login</h2>
//         {error && <Alert variant="danger">{error}</Alert>}
//         {success && <Alert variant="success">Login successful!</Alert>}
//         <Form onSubmit={handleSubmit}>
//           {/* Username Input */}
//           <Form.Group className="mb-3" controlId="username">
//             <Form.Control
//               type="text"
//               placeholder="Enter username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           {/* Password Input */}
//           <Form.Group className="mb-3" controlId="password">
//             <Form.Control
//               type="password"
//               placeholder="Enter password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </Form.Group>

//           <Button variant="primary" type="submit" className="w-100">
//             Log in
//           </Button>
//         </Form>
//       </Container>
//     </>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; //  import navigate hook
import Topimg from '../../shared/Topimg';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate(); //  setup navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError('Please fill in both username and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5281/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Store token
        setSuccess(true);
        setError('');

        //  Redirect based on user type
        // switch (data.type || data.status) {
        //   case 'Admin':
        //     navigate('/admin');
        //     break;
        //   case 'Trainer':
        //     navigate('/t');
        //     break;
        //   case 'Member':
        //     navigate('/');
        //     break;
        //   default:
        //     navigate('/');
        // }

        switch (true) {
          case data.type === 'Admin':
            navigate('/admin');
            break;
          case data.type === 'Trainer':
            navigate('/t');
            break;
          case data.type === 'Member' && data.status === 'subscribed':
            navigate('/m');
            break;
          case data.type === 'Member':
            navigate('/');
            break;
          default:
            navigate('/');
        }
      } else {
        setError(data.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again later.');
    }
  };

  return (
    <>
      <Topimg />
      <Container className="d-grid gap-2 mt-5">
        <h2 className="text-center mb-4">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">Login successful!</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Log in
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Login;
