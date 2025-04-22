import { Col, Container, Row } from "react-bootstrap"
import TrainingPlan from "../../components/TrainingPlan"

const MemberPlans = () => {
  return (
    <Container fluid>
        <div className="d-flex align-items-center justify-content-between mb-4">
            <h4 className="fw-semibold">Your plans</h4>
        </div>
        <Row>
            <Col xs={12}> <TrainingPlan /> </Col>
            <Col xs={12}> <TrainingPlan /> </Col>
        </Row>
    </Container>
  )
}

export default MemberPlans