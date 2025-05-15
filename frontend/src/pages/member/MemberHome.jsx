import { Button, Col, Container, Row, Alert, Modal, Form } from "react-bootstrap";
import SessionCard from "../../components/SessionCard";
import { useState, useEffect } from "react";
import { parseJwt } from "../../util/util"; 

const MemberHome = () => {
  const [privateSessions, setPrivateSessions] = useState([]);
  const [groupSessions, setGroupSessions] = useState([]);
  const [error, setError] = useState(null);
  const [loadingPrivate, setLoadingPrivate] = useState(true);
  const [loadingGroup, setLoadingGroup] = useState(true);

  // Progress report modal state
  const [showReportModal, setShowReportModal] = useState(false);
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [performanceNotes, setPerformanceNotes] = useState("");
  const [currentReportId, setCurrentReportId] = useState(null);

  const [reportHistory, setReportHistory] = useState({
    weight: "N/A",
    bodyFatPercentage: "N/A",
    performanceNotes: "No previous notes."
  });

  const [showBookModal, setShowBookModal] = useState(false);
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null); // Now holds the whole trainer object

  const [bookingForm, setBookingForm] = useState({
    date: "",
    duration: "",
    time: "",
    name: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch private sessions
    const fetchPrivateSessions = async () => {
      try {
        const response = await fetch("https://localhost:7052/Session/sessions/member/private", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch private sessions");
        }

        const data = await response.json();
        setPrivateSessions(data.data);
      } catch (error) {
        setError(error.message);
      }
      setLoadingPrivate(false);
    };

    // Fetch group sessions
    const fetchGroupSessions = async () => {
      try {
        const response = await fetch("https://localhost:7052/Session", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch group sessions");
        }

        const data = await response.json();
        setGroupSessions(data.data);
      } catch (error) {
        setError(error.message);
      }
      setLoadingGroup(false);
    };

    fetchPrivateSessions();
    fetchGroupSessions();
  }, []);

  // Handle delete session
  const handleDeleteSession = async (sessionId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`https://localhost:7052/Session/${sessionId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete session");
      }

      setPrivateSessions((prev) => prev.filter((s) => s.sessionId !== sessionId));
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle join group session
  const handleJoinSession = async (sessionId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`https://localhost:7052/Booking/${sessionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to join session");
      }

      // Optionally, fetch the joined session and add to privateSessions
      const joinedSession = groupSessions.find(s => s.sessionId === sessionId);
      if (joinedSession) {
        setPrivateSessions(prev => [...prev, joinedSession]);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle opening the progress report modal
  const handleReportShow = async () => {
    setShowReportModal(true);
    const token = localStorage.getItem("token");
    try {
      // Get memberId from JWT
      const jwtPayload = parseJwt(token);
      const memberId = jwtPayload[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];

      // Get the user's progress report using memberId
      const response = await fetch(`https://localhost:7052/ProgressReport/${memberId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch progress report");

      const data = await response.json();
      if (Array.isArray(data.data) && data.data.length > 0) {
        const report = data.data[0];
        setCurrentReportId(report.reportId);
        setWeight(report.weight);
        setBodyFat(report.bodyFatPercentage);
        setPerformanceNotes(report.performanceNotes || "");
        setReportHistory({
          weight: report.weight,
          bodyFatPercentage: report.bodyFatPercentage,
          performanceNotes: report.performanceNotes || "No previous notes."
        });
      } else {
        // If no report, create one
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
            memberId: memberId,
            date: dateStr,
            weight: 0,
            bodyFatPercentage: 0,
            performanceNotes: "No previous notes."
          }),
        });

        if (!postResponse.ok) throw new Error("Failed to create progress report");

        const postData = await postResponse.json();
        setCurrentReportId(postData.data.reportId);
        setWeight(0);
        setBodyFat(0);
        setPerformanceNotes("No previous notes.");
        setReportHistory({
          weight: 0,
          bodyFatPercentage: 0,
          performanceNotes: "No previous notes."
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle updating weight and body fat percentage
  const handleUpdateReport = async () => {
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
          weight: Number(weight),
          bodyFatPercentage: Number(bodyFat)
        }),
      });

      if (!response.ok) throw new Error("Failed to update progress report");

      // Instantly update the right side
      setReportHistory((prev) => ({
        ...prev,
        weight,
        bodyFatPercentage: bodyFat
      }));
    } catch (error) {
      setError(error.message);
    }
  };

  // Fetch trainers when booking modal is opened
  const handleBookModalShow = async () => {
    setShowBookModal(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("https://localhost:7052/Trainer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch trainers");
      const data = await response.json();
      setTrainers(data.data || []);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleBookModalClose = () => {
    setShowBookModal(false);
    setBookingForm({
      date: "",
      duration: "",
      time: "",
      name: ""
    });
  };

  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "trainer_id") {
      console.log("Selected trainer ID value:", value);
      // Find the trainer object by id and set it
      const trainerObj = trainers.find((t) => String(t.trainerId) === value);
      setSelectedTrainer(trainerObj);
    } else {
      setBookingForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleBookSession = async () => {
    const token = localStorage.getItem("token");
    try {
      const jwtPayload = parseJwt(token);
      const memberId = jwtPayload[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];

      console.log("trainers", trainers)
      console.log("selected trainer" ,selectedTrainer)
      console.log("bookingForm", bookingForm)

      const response = await fetch("https://localhost:7052/Booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: bookingForm.date,
          duration: Number(bookingForm.duration),
          trainer_Id: selectedTrainer.trainerId,
          time: Number(bookingForm.time),
          name: bookingForm.name
        }),
      });

      if (!response.ok) throw new Error("Failed to book session");

      handleBookModalClose();
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Container fluid>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h4 className="fw-semibold">Your session</h4>
          <div className="d-flex gap-3">
            <Button variant="dark" onClick={handleReportShow}>Update & View your progress report</Button>
            <Button variant="dark" onClick={handleBookModalShow}>Book a session</Button>
          </div>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Row>
          {loadingPrivate ? (
            <Col xs={12} className="text-center">
              <Alert variant="info">Loading...</Alert>
            </Col>
          ) : privateSessions.length === 0 ? (
            <Col xs={12} className="text-center">
              <Alert variant="info">No sessions available</Alert>
            </Col>
          ) : (
            privateSessions.map((session) => (
              <Col xs={6} key={session.sessionId}>
                <SessionCard
                  session={session}
                  variant="trash"
                  onJoinClick={() => handleDeleteSession(session.sessionId)}
                />
              </Col>
            ))
          )}
        </Row>

        <div className="d-flex align-items-center justify-content-between mb-4 mt-4">
          <h4 className="fw-semibold">Group classes you can join</h4>
        </div>

        <Row>
          {loadingGroup ? (
            <Col xs={12} className="text-center">
              <Alert variant="info">Loading...</Alert>
            </Col>
          ) : groupSessions.length === 0 ? (
            <Col xs={12} className="text-center">
              <Alert variant="info">No group classes available</Alert>
            </Col>
          ) : (
            groupSessions.map((session) => (
              <Col xs={12} key={session.sessionId}>
                <SessionCard
                  session={session}
                  variant="button"
                  onJoinClick={() => handleJoinSession(session.sessionId)}
                />
              </Col>
            ))
          )}
        </Row>
      </Container>

      {/* Progress Report Modal */}
      <Modal show={showReportModal} onHide={() => setShowReportModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update & View Your Progress Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", gap: "24px", minHeight: "250px" }}>
            {/* Left side: Form */}
            <div style={{ flex: 1 }}>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Weight</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter weight"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Body Fat Percentage</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter body fat %"
                    value={bodyFat}
                    onChange={e => setBodyFat(e.target.value)}
                  />
                </Form.Group>
                <Button variant="dark" onClick={handleUpdateReport}>
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
                Weight: {reportHistory.weight}
              </p>
              <p style={{ margin: 0, fontWeight: "bold" }}>
                Body Fat %: {reportHistory.bodyFatPercentage}
              </p>
              <p style={{ width: "100%", height: "100%", margin: 0, whiteSpace: "pre-wrap" }}>
                {reportHistory.performanceNotes}
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReportModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Book Session Modal */}
      <Modal show={showBookModal} onHide={handleBookModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book a Session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={bookingForm.date}
                onChange={handleBookingInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration (hours)</Form.Label>
              <Form.Control
                type="number"
                name="duration"
                value={bookingForm.duration}
                onChange={handleBookingInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Trainer</Form.Label>
              <Form.Select
                name="trainer_id"
                value={selectedTrainer ? selectedTrainer.id : ""}
                onChange={handleBookingInputChange}
              >
                <option value="">Select a trainer</option>
                {trainers.map((trainer) => (
                  <option key={trainer.id} value={trainer.trainerId}>
                    {trainer.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time (hour, 24h format)</Form.Label>
              <Form.Control
                type="number"
                name="time"
                min={0}
                max={23}
                placeholder="Hour (0-23)"
                value={bookingForm.time}
                onChange={handleBookingInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Session Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Session name"
                value={bookingForm.name}
                onChange={handleBookingInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleBookModalClose}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleBookSession}>
            Book
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MemberHome;