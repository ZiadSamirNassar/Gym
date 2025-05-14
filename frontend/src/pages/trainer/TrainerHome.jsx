import { Button, Col, Container, Row, Alert } from "react-bootstrap";
import SessionCard from "../../components/SessionCard";
import { useState, useEffect } from "react";

const TrainerHome = () => {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://localhost:7052/Session/sessions/trainer", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch sessions");
        }

        const data = await response.json();
        setSessions(data.data); 
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchSessions();
  }, []);

  return (
    <>
      <Container fluid>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h4 className="fw-semibold">Your sessions</h4>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        <Row>
          {loading ? (
            <Col xs={12} className="text-center">
              <Alert variant="info">Loading...</Alert>
            </Col>
          ) : sessions.length === 0 ? (
            <Col xs={12} className="text-center">
              <Alert variant="info">No sessions available</Alert>
            </Col>
          ) : (
            sessions.map((session) => (
              <Col xs={6} key={session.id}>
                <SessionCard session={session} />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  );
};

export default TrainerHome;