import { Button, Col, Container, Row, Alert } from "react-bootstrap";
import SessionCard from "../../components/SessionCard";
import { useState, useEffect } from "react";

const MemberHome = () => {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://localhost:7052/Session", {
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
        setSessions(data.data); // Assuming the API returns sessions in `data.data`
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
          <h4 className="fw-semibold">Your session</h4>
          <Button variant="dark">Book a session</Button>
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
                <SessionCard session={session} variant="trash" />
              </Col>
            ))
          )}
        </Row>

        <div className="d-flex align-items-center justify-content-between mb-4 mt-4">
          <h4 className="fw-semibold">Group classes you can join</h4>
        </div>

        <Row>
          {/* Example static group classes */}
          <Col xs={6}>
            <SessionCard variant="button" />
          </Col>
          <Col xs={6}>
            <SessionCard variant="button" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MemberHome;