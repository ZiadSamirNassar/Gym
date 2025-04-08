import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MembershipDetails = ({ membership }) => {
  // تحديد الأنماط حسب نوع العضوية
  const getStyles = () => {
    switch(membership.type) {
      case 'blateniom':
        return {
          bg: 'dark',
          textColor: 'white',
          borderColor: 'dark',
          buttonVariant: 'light',
          badgeVariant: 'light'
        };
      case 'gold':
        return {
          bg: 'light',
          textColor: '#d4af37',
          borderColor: 'warning',
          buttonVariant: 'warning',
          badgeVariant: 'warning',
          isVip: true
        };
      default: // classic
        return {
          bg: 'primary',
          textColor: 'white',
          borderColor: 'primary',
          buttonVariant: 'info',
          badgeVariant: 'primary'
        };
    }
  };

  const styles = getStyles();

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow rounded-5" 
            bg={styles.bg}
            text={styles.textColor === '#d4af37' ? null : styles.textColor}
            border={styles.borderColor}
            style={styles.textColor === '#d4af37' ? { 
              background: 'linear-gradient(135deg, #f8f9fa 0%, #fff8e1 100%)',
              borderTop: '5px solid #ffd700',
              color: styles.textColor
            } : {}}
          >
            {styles.isVip && (
              <div className="text-end p-3">
                <Badge bg={styles.badgeVariant} text="dark" className="fs-6 p-2">
                  VIP EXCLUSIVE
                </Badge>
              </div>
            )}

            <Card.Body className="text-center">
              <Card.Title className="fw-bold mb-4" style={{ fontSize: '2rem' }}>
                {membership.title}
              </Card.Title>
              
              <h2 style={{ color: styles.textColor }}>
               <small >Total paied</small> ${membership.price} 
              </h2>
              <p className="mb-4">period : {membership.duration} month</p>
              
              <Card.Text className="mb-4 fs-5">
                {membership.description || `Our ${membership.type} membership with premium services.`}
              </Card.Text>
              
              <h4 className="mb-3 text-start" style={{ color: styles.textColor }}>
                {styles.isVip ? 'VIP Benefits:' : 'Features:'}
              </h4>
              
              <ListGroup variant="flush" className="mb-4 text-start fs-5">
                {membership.advantages.map((item, index) => (
                  <ListGroup.Item 
                    key={index}
                    className="border-0 py-2"
                    style={styles.bg === 'dark' ? { backgroundColor: '#43494e', color: 'white' } : {}}
                  >
                    <span style={{ color: '#28a745' }}>✔</span> {item}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              
              <div className="d-grid gap-3 mt-4">
                <Button 
                  variant={styles.buttonVariant}
                  size="lg" 
                  className="fw-bold py-3"
                  style={{ fontSize: '1.2rem' }}
                >
                  {styles.isVip ? 'Become VIP Member' : 'Join Now'}
                </Button>
                
                <Button 
                  as={Link} 
                  to="/memberships" 
                  variant="secondary" 
                  size="lg"
                  className="py-2"
                >
                  Back to Memberships
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MembershipDetails;