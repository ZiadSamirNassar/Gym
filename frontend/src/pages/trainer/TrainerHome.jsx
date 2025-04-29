// import { Button, Col, Container, Row } from "react-bootstrap"
// import SessionCard from "../../components/SessionCard"

// const TrainerHome = () => {
//   return (
//     <>
//         <Container fluid>
//             <div className="d-flex align-items-center justify-content-between mb-4">
//                 <h4 className="fw-semibold">Your sessions</h4>
//             </div>
//             <Row>
//                 <Col xs={6}> <SessionCard /> </Col>
//                 <Col xs={6}> <SessionCard /> </Col>
//                 <Col xs={6}> <SessionCard /> </Col>
//                 <Col xs={6}> <SessionCard /> </Col>
//             </Row>
//             <div className="d-flex align-items-center justify-content-between mb-4 mt-4">
//                 <h4 className="fw-semibold">Group classes you can join</h4>
//             </div>
//             <Row>
//                 <Col xs={6}> <SessionCard /> </Col>
//                 <Col xs={6}> <SessionCard /> </Col>
//                 <Col xs={6}> <SessionCard /> </Col>
//                 <Col xs={6}> <SessionCard /> </Col>
//                 <Col xs={6}> <SessionCard /> </Col>
//                 <Col xs={6}> <SessionCard /> </Col>
//                 <Col xs={6}> <SessionCard /> </Col>
//                 <Col xs={6}> <SessionCard /> </Col>
//                 <Col xs={6}> <SessionCard /> </Col>
//                 <Col xs={6}> <SessionCard /> </Col>
//                 <Col xs={6}> <SessionCard /> </Col>
//                 <Col xs={6}> <SessionCard /> </Col>
//             </Row>
//         </Container>

//     </>
//   )
// }

// export default TrainerHome













// import { useEffect, useState } from "react";
// import { Button, Col, Container, Row, Modal, Form, Alert } from "react-bootstrap";
// import SessionCard from "../../components/SessionCard";

// const TrainerHome = () => {
//   const [yourSessions, setYourSessions] = useState([]);
//   const [availableSessions, setAvailableSessions] = useState([]);
//   const [error, setError] = useState(null);

//   // Modal state
//   const [showModal, setShowModal] = useState(false);
//   const [newSession, setNewSession] = useState({
//     title: "",
//     date: "",
//     time: "",
//     durationMinutes: "",
//   });

//   useEffect(() => {
//     fetchSessions();
//   }, []);

//   const fetchSessions = async () => {
//     try {
//       const response = await fetch("http://localhost:5281/api/GroupTrainingSessions/all");
//       if (!response.ok) {
//         throw new Error("Failed to fetch sessions");
//       }
//       const data = await response.json();

//       const currentTrainerName = "Trainer1"; // Replace with dynamic later
//       const mySessions = data.filter(session => session.trainerName === currentTrainerName);
//       const otherSessions = data.filter(session => session.trainerName !== currentTrainerName);

//       setYourSessions(mySessions);
//       setAvailableSessions(otherSessions);
//     } catch (error) {
//       console.error("Error fetching sessions:", error);
//       setError("There was an issue fetching sessions. Please try again later.");
//     }
//   };

//   const handleCreateSession = async () => {
//     try {
//       const sessionData = {
//         title: newSession.title,
//         date: newSession.date,
//         time: newSession.time,
//         durationMinutes: parseInt(newSession.durationMinutes),
//         trainerName: "Trainer1", // again replace dynamically if needed
//       };

//       const response = await fetch("http://localhost:5281/api/PersonalTrainingSessions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(sessionData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create session");
//       }

//       setShowModal(false);
//       setNewSession({ title: "", date: "", time: "", durationMinutes: "" });
//       fetchSessions(); // Refresh list
//     } catch (error) {
//       console.error("Error creating session:", error);
//       setError("Failed to create session. Please try again.");
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewSession({ ...newSession, [name]: value });
//   };

//   return (
//     <>
//       <Container fluid>
//         {error && <Alert variant="danger">{error}</Alert>}

//         {/* Create Button */}
//         <div className="d-flex align-items-center justify-content-between mb-4">
//           <h4 className="fw-semibold">Your Personal Training sessions</h4>
//           <Button variant="primary" onClick={() => setShowModal(true)}>
//             + Create Personal Training Session
//           </Button>
//         </div>

//         <Row>
//           {yourSessions.map((session) => (
//             <Col key={session.id} xs={12} md={6}>
//               <SessionCard session={session} />
//             </Col>
//           ))}
//         </Row>

//         <div className="d-flex align-items-center justify-content-between mb-4 mt-4">
//           <h4 className="fw-semibold">Group classes you Assigned to them</h4>
//         </div>

//         <Row>
//           {availableSessions.map((session) => (
//             <Col key={session.id} xs={12} md={6}>
//               <SessionCard session={session} />
//             </Col>
//           ))}
//         </Row>
//       </Container>

//       {/* Create Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create New Personal Training Session</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="sessionTitle" className="mb-3">
//               <Form.Label>Session Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter session title"
//                 name="title"
//                 value={newSession.title}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="sessionDate" className="mb-3">
//               <Form.Label>Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="date"
//                 value={newSession.date}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="sessionTime" className="mb-3">
//               <Form.Label>Time</Form.Label>
//               <Form.Control
//                 type="time"
//                 name="time"
//                 value={newSession.time}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="sessionDuration" className="mb-3">
//               <Form.Label>Duration (minutes)</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter duration"
//                 name="durationMinutes"
//                 value={newSession.durationMinutes}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleCreateSession}>
//             Create Session
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default TrainerHome;
//--------------------------------------------------------------------------------------------































































































import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Modal, Form, Alert } from "react-bootstrap";
import SessionCard from "../../components/SessionCard";

const TrainerHome = () => {
  const [yourSessions, setYourSessions] = useState([]);
  const [availableSessions, setAvailableSessions] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newSession, setNewSession] = useState({
    title: "",
    date: "",
    time: "",
    durationMinutes: "",
  });

  const currentTrainerName = "Trainer1"; // Replace with dynamic trainer name fetching

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch("http://localhost:5281/api/GroupTrainingSessions/all");
      if (!response.ok) {
        throw new Error("Failed to fetch sessions");
      }
      const data = await response.json();

      const mySessions = data.filter(session => session.trainerName === currentTrainerName);
      const otherSessions = data.filter(session => session.trainerName !== currentTrainerName);

      setYourSessions(mySessions);
      setAvailableSessions(otherSessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setError("There was an issue fetching sessions. Please try again later.");
    }
  };

  const handleCreateSession = async () => {
    try {
      const sessionData = {
        title: newSession.title,
        date: newSession.date + "T00:00:00",  // make sure backend gets full ISO Date
        time: newSession.time + ":00",        // backend expects format "HH:mm:ss"
        durationMinutes: parseInt(newSession.durationMinutes),
        trainerName: currentTrainerName,
      };
  
      const response = await fetch("http://localhost:5281/api/PersonalTrainingSessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create session");
      }
  
      setShowModal(false);
      setNewSession({ title: "", date: "", time: "", durationMinutes: "" });
      fetchSessions(); // Refresh the sessions list
    } catch (error) {
      console.error("Error creating session:", error);
      setError("Failed to create session. Please try again.");
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSession({ ...newSession, [name]: value });
  };

  return (
    <>
      <Container fluid>
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Create Button */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h4 className="fw-semibold">Your Personal Training sessions</h4>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            + Create Personal Training Session
          </Button>
        </div>

        <Row>
          {yourSessions.map((session) => (
            <Col key={session.id} xs={12} md={6}>
              <SessionCard session={session} />
            </Col>
          ))}
        </Row>

        <div className="d-flex align-items-center justify-content-between mb-4 mt-4">
          <h4 className="fw-semibold">Group classes you are assigned to</h4>
        </div>

        <Row>
          {availableSessions.map((session) => (
            <Col key={session.id} xs={12} md={6}>
              <SessionCard session={session} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Create Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Personal Training Session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="sessionTitle" className="mb-3">
              <Form.Label>Session Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter session title"
                name="title"
                value={newSession.title}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="sessionDate" className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={newSession.date}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="sessionTime" className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={newSession.time}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="sessionDuration" className="mb-3">
              <Form.Label>Duration (minutes)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter duration"
                name="durationMinutes"
                value={newSession.durationMinutes}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateSession}>
            Create Session
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TrainerHome;








