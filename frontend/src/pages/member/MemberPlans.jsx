import { Col, Container, Row, Alert } from "react-bootstrap";
import TrainingPlan from "../../components/TrainingPlan";
import { useState, useEffect } from "react";

const MemberPlans = () => {
  localStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiem96IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoibWVtYmVyIiwiZXhwIjoxNzQ3Mjg5NDI5LCJpc3MiOiJNeUd5bUFwcCIsImF1ZCI6Ik15R3ltQXBwQXVkaWVuY2UifQ.w-RTaPNqlL7pOEuXEyLn5aaydEJyYHG48ma493T8i8o"
  );

  localStorage.setItem(
    "type",
    "member"
  );

  localStorage.setItem(
    "membershipPlanName",
    "gold"
  );

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