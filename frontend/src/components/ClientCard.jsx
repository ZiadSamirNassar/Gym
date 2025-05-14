import { Card, Container, Button } from "react-bootstrap"
import PlanLabel from "./PlanLabel"

const ClientCard = ({ client, onMakePlan }) => {
  return (
    <Container fluid className="p-0">
      <Card style={{height: "350px"}} className="w-100 mb-3 p-3 d-flex flex-column justify-content-between rounded-3 border-3 gap-3">
          <div className="d-flex w-100 justify-content-between align-items-center">
            <Card.Title className="fs-5 m-0">{ client.name }</Card.Title>
            <PlanLabel variant="gold"/>
          </div>
          <div>
            <p className="m-0">sessions: 2/10</p>
            <p className="m-0">weight: null</p>
            <p className="m-0">height: 5'7"</p>
          </div>
          <div>
            <Button variant="dark" className="px-5 py-2 rounded-1 shadow w-100 mb-2">View performance report</Button>
            <Button variant="dark" onClick={onMakePlan}  className="px-5 py-2 rounded-1 shadow w-100">Make a training plan</Button>
          </div>
      </Card>
    </Container>
  )
}

export default ClientCard