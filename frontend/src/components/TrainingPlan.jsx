import Level from "./Level";
import { Container, Card, Button } from "react-bootstrap"
import { Alarm } from 'react-bootstrap-icons';

const TrainingPlan = ({ plan }) => {
  return (
    <Container fluid className="p-0">
      <div className="mb-3 p-4 rounded-4 border border-3 border-secondary-subtle d-flex flex-column gap-5">
        <div className=" d-flex flex-row justify-content-between align-items-center ">
          <div>
              <div className="d-flex gap-4">
                <Card.Title className="fs-5 m-0">Your 3rd workout</Card.Title><br/>
                <Level variant={ plan.level }/>
              </div>
              <Card.Subtitle className="fs-6 fw-semibold text-secondary">By Ahmed Abdelaleem</Card.Subtitle>
          </div>
          <div fw-semibold fs-6 text-secondary><Alarm color="gray"/> { plan.duration } h</div>
        </div>
        <p className="fw-bold text-secondary fs-6">
          { plan.exerciseName }
        </p>
      </div>
    </Container>
  )
}

export default TrainingPlan