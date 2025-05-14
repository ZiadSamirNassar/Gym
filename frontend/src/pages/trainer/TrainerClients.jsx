import { Col, Container, Row, Alert, Modal, Form, Button } from "react-bootstrap";
import ClientCard from "../../components/ClientCard";
import { useState, useEffect } from "react";

const TrainerClients = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const [plan, setPlan] = useState({
    name: "",
    duration: "",
    level: "easy",
    details: "",
  });

  const handleClose = () => setShowModal(false);
  const handleShow = (client) => {
    setSelectedClient(client);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlan((prevPlan) => ({
      ...prevPlan,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://localhost:7052/TrainingPlan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          memberId: selectedClient.memberId,
          exerciseName: plan.details,
          duration: plan.duration,
          level: plan.level,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save the training plan");
      }

      // Reset form and close modal
      setPlan({
        name: "",
        duration: "",
        level: "easy",
        details: "",
      });
      handleClose();
    } catch (error) {
      console.error("Error saving training plan:", error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://localhost:7052/Members", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch clients");
        }

        const data = await response.json();
        setClients(data.data); // Assuming the API returns clients in `data.data`
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    };

    fetchClients();
  }, []);

  return (
    <>
      <Container fluid>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h4 className="fw-semibold">Your Clients</h4>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Row>
          {loading ? (
            <Col xs={12} className="text-center">
              <Alert variant="info">Loading...</Alert>
            </Col>
          ) : clients.length === 0 ? (
            <Col xs={12} className="text-center">
              <Alert variant="info">No clients available</Alert>
            </Col>
          ) : (
            clients.map((client) => (
              <Col xs={6} key={client.id}>
                <ClientCard client={client} onMakePlan={() => handleShow(client)} />
              </Col>
            ))
          )}
        </Row>
      </Container>

      {/* Modal for creating a training plan */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Training Plan for {selectedClient?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Plan Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter plan name"
                value={plan.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration (in hours)</Form.Label>
              <Form.Control
                type="number"
                name="duration"
                placeholder="Enter duration"
                value={plan.duration}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Level</Form.Label>
              <Form.Select
                name="level"
                value={plan.level}
                onChange={handleChange}
              >
                <option value="easy">Easy</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Plan Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="details"
                placeholder="Write the plan here"
                value={plan.details}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleSubmit}>
            Save Plan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TrainerClients;