import { Col, Container, Row, Alert, Modal, Form, Button } from "react-bootstrap";
import ClientCard from "../../components/ClientCard";
import { useState, useEffect } from "react";

const TrainerClients = () => {
  localStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWhtZWQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJ0cmFpbmVyIiwiZXhwIjoxNzQ3Mjg5NTcxLCJpc3MiOiJNeUd5bUFwcCIsImF1ZCI6Ik15R3ltQXBwQXVkaWVuY2UifQ.7GD-vTkK18YHmRiaeC3lE-rOSXQoAx-HZikpTISySwo"
  );

  localStorage.setItem(
    "type",
    "trainer"
  );

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

  // Performance report modal state
  const [showReportModal, setShowReportModal] = useState(false);
  const [performanceNotes, setPerformanceNotes] = useState("");
  const [performanceHistory, setPerformanceHistory] = useState("No previous notes."); // Replace with real data if available
  const [currentReportId, setCurrentReportId] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = (client) => {
    setSelectedClient(client);
    setShowModal(true);
  };

  const handleReportClose = () => setShowReportModal(false);
  const handleReportShow = async (client) => {
    setSelectedClient(client);
    console.log(client)
    try {
      const token = localStorage.getItem("token");
      // 1. Try to get the progress report for this client
      const response = await fetch("https://localhost:7052/ProgressReport/" + client.memberId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch progress report");
      }

      const data = await response.json();

      // 2. If no report exists, create one with empty/default values
      if (Array.isArray(data.data) && data.data.length === 0) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}-${mm}-${dd}`;

        const postResponse = await fetch("https://localhost:7052/ProgressReport", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            memberId: client.memberId,
            date: dateStr,
            weight: 0,
            bodyFatPercentage: 0,
            performanceNotes: "no previous notes.",
          }),
        });

        if (!postResponse.ok) {
          throw new Error("Failed to create progress report");
        }

        setPerformanceHistory("No previous notes.");
        setCurrentReportId(null);
      } else if (Array.isArray(data.data) && data.data.length > 0) {
        // 3. If report exists, show the latest one
        const report = data.data[0];
        setPerformanceHistory(report.performanceNotes || "No previous notes.");
        setCurrentReportId(report.reportId); // Save the reportId for PATCH
      }
    } catch (error) {
      setPerformanceHistory("No previous notes.");
      setCurrentReportId(null);
    }

    setShowReportModal(true);
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
          planName: plan.name,
          details: plan.details,
          duration: plan.duration,
          level: plan.level,
        }),
      });

      if (!response.ok) {
        console.log("Response:", response);
        throw new Error("Failed to save the training plan");
      }

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

  const handleUpdatePerformance = async () => {
    if (!currentReportId) return;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`https://localhost:7052/ProgressReport/${currentReportId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          performanceNotes: performanceNotes,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update performance notes");
      }

      // Instantly update the notes on the right side
      setPerformanceHistory(performanceNotes);
      setPerformanceNotes("");
    } catch (error) {
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
                <ClientCard
                  client={client}
                  onMakePlan={() => handleShow(client)}
                  onUpdateReport={() => handleReportShow(client)}
                />
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

      {/* Modal for updating performance report */}
      <Modal show={showReportModal} onHide={handleReportClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Performance Report for {selectedClient?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", gap: "24px", minHeight: "250px" }}>
            {/* Left side: Form */}
            <div style={{ flex: 1 }}>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Performance Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="performance notes"
                    value={performanceNotes}
                    onChange={e => setPerformanceNotes(e.target.value)}
                    style={{ height: "180px", resize: "none" }} // Increased fixed height
                    rows={7}
                  />
                </Form.Group>
                <Button variant="dark" onClick={handleUpdatePerformance}>
                  Update
                </Button>
              </Form>
            </div>
            {/* Right side: History */}
            <div
              style={{
                flex: 1,
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                overflowY: "auto",
                height: "100%",
                minHeight: "200px",
                maxHeight: "350px",
                background: "#f8f9fa"
              }}
            >
              <p style={{ margin: 0, fontWeight: "bold" }}>
                Weight: {selectedClient?.weight ?? "N/A"}
              </p>
              <p style={{ margin: 0, fontWeight: "bold" }}>
                Body Fat %: {selectedClient?.bodyFatPercentage ?? "N/A"}
              </p>
              <p style={{ width: "100%", height: "100%", margin: 0, whiteSpace: "pre-wrap" }}>
                {performanceHistory}
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReportClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TrainerClients;