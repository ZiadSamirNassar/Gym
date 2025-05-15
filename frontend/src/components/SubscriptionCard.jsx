import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const SubscriptionCard = ({ title, price, duration, benefits, personalSessions }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  
  const benefitsList = benefits?.split(',') || [
    'Access to all workouts',
    'Access to all nutrition plans',
    'Access to all recipes',
    'Access to all articles',
    'Access to all videos'
  ];

  const handleSubscribe = () => {
    // Check if user is logged in (example check)
    const isLoggedIn = localStorage.getItem('authData') !== null;
    
    if (isLoggedIn) {
      // Logic for subscribed users
      console.log(`Subscribed to ${title} plan`);
    } else {
      // Show registration required modal
      setShowModal(true);
    }
  };

  const handleNavigateToRegister = () => {
    navigate('/register'); // تأكد أن لديك هذا المسار في router الخاص بك
    setShowModal(false);
  };

  return (
    <>
      <Card style={{ 
        width: '18rem', 
        margin: '10px', 
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease',
        ':hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
        }
      }}>
        <Card.Body>
          <Card.Title style={{ fontSize: '30px', fontFamily: 'system-ui', color: '#2c3e50' }}>
            {title || 'Premium Plan'}
          </Card.Title>
          <Card.Text>
            <p>
              <span className="price" style={{ fontSize: '25px', fontFamily: 'system-ui', fontWeight: 'bold' }}>
                ${price || '25'}
              </span>{' '}
              <small>per {duration ? `${duration} months` : 'month'}</small>
            </p>
            <ul className="features" style={{ paddingLeft: '20px', textAlign: 'left' }}>
              {benefitsList.map((benefit, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>{benefit.trim()}</li>
              ))}
              {personalSessions > 0 && (
                <li style={{ fontWeight: 'bold' }}>
                  {personalSessions} personal training sessions
                </li>
              )}
            </ul>
          </Card.Text>
          <Button 
            variant="primary" 
            onClick={handleSubscribe}
            style={{ 
              backgroundColor: '#3498db',
              borderColor: '#3498db',
              width: '100%',
              padding: '10px',
              fontSize: '16px'
            }}
          >
            Subscribe Now
          </Button>
        </Card.Body>
      </Card>

      {/* Registration Required Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#2c3e50' }}>Registration Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#3498db" viewBox="0 0 16 16" style={{ marginBottom: '20px' }}>
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
            </svg>
            <h4 style={{ marginBottom: '15px', color: '#2c3e50' }}>You need an account to subscribe</h4>
            <p style={{ marginBottom: '25px' }}>
              Please register or login to subscribe to our membership plans and enjoy all the benefits.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'center' }}>
          <Button 
            variant="outline-secondary" 
            onClick={() => setShowModal(false)}
            style={{ marginRight: '10px' }}
          >
            Maybe Later
          </Button>
          <Button 
            variant="primary" 
            onClick={handleNavigateToRegister}
            style={{ 
              backgroundColor: '#3498db',
              borderColor: '#3498db',
              padding: '8px 20px'
            }}
          >
            Go to Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SubscriptionCard;