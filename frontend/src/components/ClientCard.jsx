import { Card, Container, Button } from "react-bootstrap"
import PlanLabel from "./PlanLabel"

const ClientCard = ({ client, onMakePlan, onUpdateReport }) => {
  return (
    <Container fluid className="p-0">
      <Card style={{height: "350px"}} className="w-100 mb-3 p-3 d-flex flex-column justify-content-between rounded-3 border-3 gap-3">
          <div className="d-flex w-100 justify-content-between align-items-center">
            <Card.Title className="fs-5 m-0">{ client.name }</Card.Title>
            <PlanLabel variant="gold"/>
          </div>
          <div style={{height: "100px"}}>
          </div>
          <div>
            <Button variant="dark" onClick={onUpdateReport} className="px-5 py-2 rounded-1 shadow w-100 mb-2">Update performance report</Button>
            <Button variant="dark" onClick={onMakePlan}  className="px-5 py-2 rounded-1 shadow w-100">Make a training plan</Button>
          </div>
      </Card>
    </Container>
  )
}

export default ClientCard