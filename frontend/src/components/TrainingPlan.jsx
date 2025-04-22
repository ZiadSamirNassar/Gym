import Level from "./Level";
import { Container, Card, Button } from "react-bootstrap"
import { Alarm } from 'react-bootstrap-icons';

const TrainingPlan = () => {
  return (
    <Container fluid className="p-0">
      <div className="mb-3 p-4 rounded-4 border border-3 border-secondary-subtle d-flex flex-column gap-5">
        <div className=" d-flex flex-row justify-content-between align-items-center ">
          <div>
              <div className="d-flex gap-4">
                <Card.Title className="fs-5 m-0">Your 3rd workout</Card.Title><br/>
                <Level variant="intermediate"/>
              </div>
              <Card.Subtitle className="fs-6 fw-semibold text-secondary">By Ahmed Abdelaleem</Card.Subtitle>
          </div>
          <div fw-semibold fs-6 text-secondary><Alarm color="gray"/> 1h 30min</div>
        </div>
        <p className="fw-bold text-secondary fs-6">
            PULL
            Deadlifts 1x5+/Barbell rows 4x5, 1x5+ (alternate, so if you did deadlifts on Monday, you would do rows on Thursday, and so on)
            3x8-12 Pulldowns OR Pullups OR chinups
            3x8-12 seated cable rows OR chest supported rows
            5x15-20 face pulls
            4x8-12 hammer curls
            4x8-12 dumbbell curls
            PUSH
            4x5, 1x5+ bench press/4x5, 1x5+ overhead press (alternate in the same fashion as the rows and deadlifts)
            3x8-12 overhead press/3x8-12 bench press (do the opposite movement: if you bench pressed first, overhead press here)
            3x8-12 incline dumbbell press
            3x8-12 triceps pushdowns SS 3x15-20 lateral raises
            3x8-12 overhead triceps extensions SS 3x15-20 lateral raises
        </p>
      </div>
    </Container>
  )
}

export default TrainingPlan