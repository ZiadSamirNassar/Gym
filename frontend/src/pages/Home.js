import React from 'react';
import { Container, Card, Row, Col, Button, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Home.css';

const Homepage = () => {
    return (
        <Container className="my-5" style={{ backgroundColor: '#f5f5f5', padding: '2rem', borderRadius: '10px' }}>
          <h1 className="text-center mb-4" style={{ color: '#333' }}>Memberships</h1>
          <p className="text-center mb-5" style={{ color: '#666' }}>
            We offer the PF Black Card® Membership and Classic Membership. Both get you access to The Judgement Free Zone®, and tons of cardio and strength equipment.
          </p>

    
          <Row className="justify-content-center">
            
            {/* بطاقة العضوية الكلاسيكية */}
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow membership-card" style={{ borderTop: '5px solid #007bff' }}>
                <Card.Body className="text-center">
                  <Card.Title className="fw-bold" style={{ color: '#007bff' }}>CLASSIC</Card.Title>
                  <Card.Subtitle className="my-3 text-muted">
                    Starting at
                  </Card.Subtitle>
                  <h3 className="my-3">$15 /mo*</h3>
                  <small className="text-muted">plus taxes & fees</small>
                  
                  <ul className="text-start my-4 ps-4" style={{ color: '#555' }}>
                    <li>Our standard membership</li>
                    <li>Unlimited access to your home club</li>
                    <li>Basic equipment usage</li>
                  </ul>
                  
                  <div className="d-grid gap-2">
                    <Button variant="outline-primary" className="mb-2">Learn More</Button>
                    <Button variant="primary" className='join-btn'>Join Now</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
    
            {/* بطاقة العضوية السوداء */}
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow membership-card" style={{ backgroundColor: '#343a40', color: 'white' }}>
                <Card.Body className="text-center">
                  <Card.Title className="fw-bold" style={{ color: 'white' }}>PF BLACK CARD®</Card.Title>
                  <Card.Subtitle className="my-3" style={{ color: '#ccc' }}>
                    Starting at
                  </Card.Subtitle>
                  <h3 className="my-3" style={{ color: 'white' }}>$24.99 /mo*</h3>
                  <small style={{ color: '#aaa' }}>plus taxes & fees</small>
                  
                  <ul className="text-start my-4 ps-4" style={{ color: '#ddd' }}>
                    <li>Access to any club</li>
                    <li>Bring a guest anytime</li>
                    <li>PF+ premium digital workouts</li>
                    <li>And so much more!</li>
                  </ul>
                  
                  <div className="d-grid gap-2">
                    <Button variant="outline-light" className="mb-2">Learn More</Button>
                    <Button variant="light" className='join-btn'>Join Now</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
    
            {/* بطاقة العضوية الذهبية (الجديدة) */}
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow membership-card" style={{ 
                backgroundColor: '#f8f9fa',
                borderTop: '5px solid #ffd700',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <Badge bg="warning" text="dark" style={{
                  position: 'absolute',
                  top: '10px',
                  right: '-30px',
                  transform: 'rotate(45deg)',
                  width: '120px',
                  fontSize: '0.8rem',
                  padding: '5px 0'
                }}>VIP</Badge>
                
                <Card.Body className="text-center">
                  <Card.Title className="fw-bold" style={{ color: '#d4af37' }}>GOLD MEMBERSHIP</Card.Title>
                  <Card.Subtitle className="my-3 text-muted">
                    Starting at
                  </Card.Subtitle>
                  <h3 className="my-3" style={{ color: '#d4af37' }}>$49.99 /mo*</h3>
                  <small className="text-muted">plus taxes & fees</small>
                  
                  <ul className="text-start my-4 ps-4" style={{ color: '#555' }}>
                    <li>All Black Card benefits</li>
                    <li>Personal trainer sessions</li>
                    <li>VIP locker room access</li>
                    <li>Free massage sessions</li>
                    <li>Priority booking</li>
                  </ul>
                  
                  <div className="d-grid gap-2">
                    <Button variant="outline-warning" className="mb-2">Learn More</Button>
                    <Button variant="warning" className='join-btn' style={{ color: 'white', fontWeight: 'bold' }}>Join Now</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      );
}

export default Homepage;