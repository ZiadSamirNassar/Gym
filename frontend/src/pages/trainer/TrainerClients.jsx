import { Button, Col, Container, Row } from "react-bootstrap"
import SessionCard from "../../components/SessionCard"
import ClientCard from "../../components/ClientCard"

const TrainerClients = () => {
  return (
    <>
        <Container fluid >
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h4 className="fw-semibold">Your Clients</h4>
            </div>
            <Row>
                <Col xs={6}> <ClientCard /> </Col>
                <Col xs={6}> <ClientCard /> </Col>
                <Col xs={6}> <ClientCard /> </Col>
                <Col xs={6}> <ClientCard /> </Col>
            </Row>
        </Container>

    </>
  )
}

export default TrainerClients