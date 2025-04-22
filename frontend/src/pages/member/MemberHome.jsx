import { Button, Col, Container, Row } from "react-bootstrap"
import SessionCard from "../../components/SessionCard"

const MemberHome = () => {
  return (
    <>
        <Container fluid>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h4 className="fw-semibold">Your session</h4>
                <Button variant="dark">Book a session</Button> 
            </div>
            <Row>
                <Col xs={6}> <SessionCard variant="trash"/> </Col>
                <Col xs={6}> <SessionCard variant="trash"/> </Col>
                <Col xs={6}> <SessionCard variant="trash"/> </Col>
                <Col xs={6}> <SessionCard variant="trash"/> </Col>
            </Row>
            <div className="d-flex align-items-center justify-content-between mb-4 mt-4">
                <h4 className="fw-semibold">Group classes you can join</h4>
            </div>
            <Row>
                <Col xs={6}> <SessionCard variant="button"/> </Col>
                <Col xs={6}> <SessionCard variant="button"/> </Col>
                <Col xs={6}> <SessionCard variant="button"/> </Col>
                <Col xs={6}> <SessionCard variant="button"/> </Col>
                <Col xs={6}> <SessionCard variant="button"/> </Col>
                <Col xs={6}> <SessionCard variant="button"/> </Col>
                <Col xs={6}> <SessionCard variant="button"/> </Col>
                <Col xs={6}> <SessionCard variant="button"/> </Col>
                <Col xs={6}> <SessionCard variant="button"/> </Col>
                <Col xs={6}> <SessionCard variant="button"/> </Col>
                <Col xs={6}> <SessionCard variant="button"/> </Col>
                <Col xs={6}> <SessionCard variant="button"/> </Col>
            </Row>
        </Container>

    </>
  )
}

export default MemberHome