import React from 'react';
import { Card, Button, Badge, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const MembershipCard = ({ membership }) => {
  // تحديد الألوان وأنواع الأزرار بناءً على نوع العضوية
  let cardStyle = {};
  let textColor = '#333';
  let buttonVariant = 'primary';
  let borderColor = '#007bff';
  
  switch(membership.type) {
    case 'black-card':
      cardStyle = { backgroundColor: '#343a40' };
      textColor = 'white';
      buttonVariant = 'light';
      borderColor = '#343a40';
      break;
    case 'gold':
      cardStyle = { background: 'linear-gradient(135deg, #f8f9fa 0%, #fff8e1 100%)' };
      textColor = '#d4af37';
      buttonVariant = 'warning';
      borderColor = '#d4af37';
      break;
    default: // classic
      cardStyle = { backgroundColor: '#fff' };
      textColor = '#007bff';
      buttonVariant = 'primary';
      borderColor = '#007bff';
  }

  return (
    <Card className="h-100 shadow" style={{ 
      ...cardStyle,
      color: textColor,
      borderTop: `5px solid ${borderColor}`,
      position: 'relative'
    }}>
      
      
      <Card.Body className="text-center">
        <Card.Title className="fw-bold" style={{ color: textColor }}>
          {membership.title}
        </Card.Title>

        <h1 className="my-3" style={{ color: textColor }}>
          ${membership.price} 
        </h1>
        
        <small style={{ color: textColor === 'white' ? '#aaa' : '#6c757d' }}>
        duration: {membership.duration} month
        </small>
        
        <ListGroup variant="flush" className="my-4 text-start">
          {membership.advantages.map((advantage, index) => (
            <ListGroup.Item 
              key={index}
              style={{ 
                backgroundColor: textColor === 'white' ? '#43494e' : 'transparent',
                color: textColor === 'white' ? '#ddd' : '#333',
                borderColor: textColor === 'white' ? '#555' : '#eee'
              }}
            >
              {advantage}
            </ListGroup.Item>
          ))}
        </ListGroup>
        
        <div className="d-grid gap-2">
          <Button 
            as={Link} 
            to={`/${membership.type}`} 
            variant={`outline-${buttonVariant}`} 
            className="mb-2"
          >
            Learn More
          </Button>
          <Button variant={buttonVariant}>
            Join Now
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default MembershipCard;