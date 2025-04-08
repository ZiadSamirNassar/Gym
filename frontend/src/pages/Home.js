import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Home.css';
import MembershipCard from '../components/MembershipCard';
import Membershipdata from '../data/Homedata';
import { Container, Row, Col } from 'react-bootstrap';



const Homepage = () => {
    return (
        // Membershipdata.map( Membership => <MembershipCard  membership={Membership} />)

        <Container className="my-5">

            <section className="text-center mb-5">
              <h1>Welcome to Our <span style={{ color:'red', fontSize: '60px' }}>Gym</span></h1>
              <p className="lead">Choose the membership that fits your fitness journey</p>
            </section>


            <section>
              <h2 className="text-center mb-4">Our Membership Plans</h2>
              <Row className="justify-content-center">
                {Membershipdata.map((membership) => (
                  <Col key={membership.id} lg={4} md={6} className="mb-4">
                    <MembershipCard membership={membership} />
                  </Col>
                ))}
              </Row>
            </section>

          </Container>

      );
}

export default Homepage;