import { Col, Container, Row, Alert } from "react-bootstrap";
import TrainingPlan from "../../components/TrainingPlan";
import { useState, useEffect } from "react";

const MemberPlans = () => {
  const [trainingPlans, setTrainingPlans] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainingPlans = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://localhost:7052/TrainingPlan", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch training plans");
        }

        const data = await response.json();
        setTrainingPlans(data.data);
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    };

    fetchTrainingPlans();
  }, []); // Added dependency array to avoid infinite re-renders

  return (
    <Container fluid>
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 className="fw-semibold">Your plans</h4>
      </div>
      <Row>
        {loading ? (
          <Col xs={12} className="text-center">
            <Alert variant="info">Loading...</Alert>
          </Col>
        ) : trainingPlans.length === 0 ? (
          <Col xs={12} className="text-center">
            <Alert variant="info">No training plans available</Alert>
          </Col>
        ) : (
          trainingPlans.map((plan) => (
            <Col xs={12} md={12} lg={12} key={plan.id}>
              <TrainingPlan plan={plan} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default MemberPlans;