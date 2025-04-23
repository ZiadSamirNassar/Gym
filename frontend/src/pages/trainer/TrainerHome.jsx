import { Button, Col, Container, Row } from "react-bootstrap"
import SessionCard from "../../components/SessionCard"

const TrainerHome = () => {
  return (
    <>
        <Container fluid>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h4 className="fw-semibold">Your sessions</h4>
            </div>
            <Row>
                <Col xs={6}> <SessionCard /> </Col>
                <Col xs={6}> <SessionCard /> </Col>
                <Col xs={6}> <SessionCard /> </Col>
                <Col xs={6}> <SessionCard /> </Col>
            </Row>
            <div className="d-flex align-items-center justify-content-between mb-4 mt-4">
                <h4 className="fw-semibold">Group classes you can join</h4>
            </div>
            <Row>
                <Col xs={6}> <SessionCard /> </Col>
                <Col xs={6}> <SessionCard /> </Col>
                <Col xs={6}> <SessionCard /> </Col>
                <Col xs={6}> <SessionCard /> </Col>
                <Col xs={6}> <SessionCard /> </Col>
                <Col xs={6}> <SessionCard /> </Col>
                <Col xs={6}> <SessionCard /> </Col>
                <Col xs={6}> <SessionCard /> </Col>
                <Col xs={6}> <SessionCard /> </Col>
                <Col xs={6}> <SessionCard /> </Col>
                <Col xs={6}> <SessionCard /> </Col>
                <Col xs={6}> <SessionCard /> </Col>
            </Row>
        </Container>

    </>
  )
}

export default TrainerHome