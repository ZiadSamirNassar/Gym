// import { Button, Col, Container, Row } from "react-bootstrap"
// import SessionCard from "../../components/SessionCard"

// const MemberHome = () => {
//   return (
//     <>
//         <Container fluid>
//             <div className="d-flex align-items-center justify-content-between mb-4">
//                 <h4 className="fw-semibold">Your session</h4>
//                 <Button variant="dark">Book a session</Button> 
//             </div>
//             <Row>
//                 <Col xs={6}> <SessionCard variant="trash"/> </Col>
//                 <Col xs={6}> <SessionCard variant="trash"/> </Col>
//                 <Col xs={6}> <SessionCard variant="trash"/> </Col>
//                 <Col xs={6}> <SessionCard variant="trash"/> </Col>
//             </Row>
//             <div className="d-flex align-items-center justify-content-between mb-4 mt-4">
//                 <h4 className="fw-semibold">Group classes you can join</h4>
//             </div>
//             <Row>
//                 <Col xs={6}> <SessionCard variant="button"/> </Col>
//                 <Col xs={6}> <SessionCard variant="button"/> </Col>
//                 <Col xs={6}> <SessionCard variant="button"/> </Col>
//                 <Col xs={6}> <SessionCard variant="button"/> </Col>
//                 <Col xs={6}> <SessionCard variant="button"/> </Col>
//                 <Col xs={6}> <SessionCard variant="button"/> </Col>
//                 <Col xs={6}> <SessionCard variant="button"/> </Col>
//                 <Col xs={6}> <SessionCard variant="button"/> </Col>
//                 <Col xs={6}> <SessionCard variant="button"/> </Col>
//                 <Col xs={6}> <SessionCard variant="button"/> </Col>
//                 <Col xs={6}> <SessionCard variant="button"/> </Col>
//                 <Col xs={6}> <SessionCard variant="button"/> </Col>
//             </Row>
//         </Container>

//     </>
//   )
// }

// export default MemberHome



// import { useEffect, useState } from "react";
// import { Button, Col, Container, Row } from "react-bootstrap";
// import SessionCard from "../../components/SessionCard";

// const MemberHome = () => {
//   const [yourSessions, setYourSessions] = useState([]);
//   const [availableSessions, setAvailableSessions] = useState([]);

//   useEffect(() => {
//     fetchSessions();
//   }, []);

//   const fetchSessions = async () => {
//     try {
//       const response = await fetch("http://localhost:5281/api/GroupTrainingSessions/all");
      
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
      
//       const data = await response.json();

//       // Temporary logic to split sessions (until real booking is implemented)
//       const midpoint = Math.floor(data.length / 2);
//       setYourSessions(data.slice(0, midpoint));
//       setAvailableSessions(data.slice(midpoint));
//     } catch (error) {
//       console.error("Error fetching sessions:", error);
//     }
//   };

//   return (
//     <Container fluid>
//       {/* Your Sessions */}
//       <div className="d-flex align-items-center justify-content-between mb-4">
//         <h4 className="fw-semibold">Your sessions</h4>
//         <Button variant="dark">Book a session</Button>
//       </div>


//       {/* Available Group Classes */}
//       <div className="d-flex align-items-center justify-content-between mt-5 mb-4">
//         <h4 className="fw-semibold">Group classes you can join</h4>
//       </div>

//       <Row>
//         {availableSessions.map((session) => (
//           <Col key={session.id + "-group"} xs={12} md={6}>
//             <SessionCard variant="button" session={session} />
//           </Col>
//         ))}
//       </Row>
      
//       <Row>
//         {yourSessions.map((session) => (
//           <Col key={session.id} xs={12} md={6}>
//             <SessionCard variant="button" session={session} />
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default MemberHome;



























// import { useEffect, useState } from "react";
// import { Button, Col, Container, Modal, Form, Row } from "react-bootstrap";
// import SessionCard from "../../components/SessionCard";

// const MemberHome = () => {
//   const [yourSessions, setYourSessions] = useState([]);
//   const [availableSessions, setAvailableSessions] = useState([]);
//   const [selectedSession, setSelectedSession] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const [fullName, setFullName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [notes, setNotes] = useState("");

//   useEffect(() => {
//     fetchSessions();
//   }, []);

//   const fetchSessions = async () => {
//     try {
//       const response = await fetch("http://localhost:5281/api/GroupTrainingSessions/all");
      
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
      
//       const data = await response.json();
//       const midpoint = Math.floor(data.length / 2);
//       setYourSessions(data.slice(0, midpoint));
//       setAvailableSessions(data.slice(midpoint));
//     } catch (error) {
//       console.error("Error fetching sessions:", error);
//     }
//   };

//   const handleJoinClick = (session) => {
//     setSelectedSession(session);
//     setShowModal(true);
//   };

//   const handleSaveJoin = async () => {
//     const joinDetails = {
//       fullName,
//       phone,
//       notes,
//       sessionTitle: selectedSession.title,
//       trainerName: selectedSession.trainerName,
//       date: selectedSession.date,
//       time: selectedSession.time,
//     };

//     try {
//       const response = await fetch("http://localhost:5281/api/JoinedSessions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(joinDetails),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to join session");
//       }

//       alert("You have successfully joined the session!");
//       setShowModal(false);
//       setFullName("");
//       setPhone("");
//       setNotes("");
//     } catch (error) {
//       console.error("Error joining session:", error);
//     }
//   };

//   return (
//     <Container fluid>
//       <div className="d-flex align-items-center justify-content-between mb-4">
//         <h4 className="fw-semibold">Your sessions</h4>
//         <Button variant="dark">Book a session</Button>
//       </div>

//       {/* Group classes you can join */}
//       <div className="d-flex align-items-center justify-content-between mt-5 mb-4">
//         <h4 className="fw-semibold">Group classes you can join</h4>
//       </div>

//       <Row>
//         {availableSessions.map((session) => (
//           <Col key={session.id + "-group"} xs={12} md={6}>
//             <SessionCard variant="button" session={session} onJoinClick={() => handleJoinClick(session)} />
//           </Col>
//         ))}
//       </Row>

//       <Row>
//         {yourSessions.map((session) => (
//           <Col key={session.id} xs={12} md={6}>
//             <SessionCard variant="button" session={session} onJoinClick={() => handleJoinClick(session)} />
//           </Col>
//         ))}
//       </Row>

//       {/* Join Session Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Join Session</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedSession && (
//             <>
//               <p><strong>Session:</strong> {selectedSession.title}</p>
//               <p><strong>Trainer:</strong> {selectedSession.trainerName}</p>
//               <p><strong>Date:</strong> {selectedSession.date} | <strong>Time:</strong> {selectedSession.time}</p>
//             </>
//           )}
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Full Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your full name"
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Phone Number</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your phone number"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Notes (optional)</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Anything you want to add..."
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
//           <Button variant="dark" onClick={handleSaveJoin}>Join</Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default MemberHome;


















// import { useEffect, useState } from "react";
// import { Button, Col, Container, Modal, Form, Row, Alert } from "react-bootstrap";
// import SessionCard from "../../components/SessionCard";

// const MemberHome = () => {
//   const [yourSessions, setYourSessions] = useState([]);
//   const [availableSessions, setAvailableSessions] = useState([]);
//   const [selectedSession, setSelectedSession] = useState(null);
//   const [showModal, setShowModal] = useState(false);
  
//   const [fullName, setFullName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [notes, setNotes] = useState("");
  
//   const [error, setError] = useState(null);  // Error handling state

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
//       const midpoint = Math.floor(data.length / 2);
//       setYourSessions(data.slice(0, midpoint));
//       setAvailableSessions(data.slice(midpoint));
//     } catch (error) {
//       console.error("Error fetching sessions:", error);
//       setError("There was an issue fetching sessions. Please try again later.");
//     }
//   };

//   const handleJoinClick = (session) => {
//     setSelectedSession(session);
//     setShowModal(true);
//   };

//   const handleSaveJoin = async () => {
//     const joinDetails = {
//       fullName,
//       phone,
//       notes,
//       sessionTitle: selectedSession.title,
//       trainerName: selectedSession.trainerName,
//       date: selectedSession.date,
//       time: selectedSession.time,
//     };

//     try {
//       const response = await fetch("http://localhost:5281/api/JoinedSessions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(joinDetails),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to join session");
//       }

//       alert("You have successfully joined the session!");
//       setShowModal(false);
//       setFullName("");
//       setPhone("");
//       setNotes("");
//     } catch (error) {
//       console.error("Error joining session:", error);
//       setError("There was an issue joining the session. Please try again later.");
//     }
//   };

//   return (
//     <Container fluid>
//       {/* Error Alert */}
//       {error && <Alert variant="danger">{error}</Alert>}

//       <div className="d-flex align-items-center justify-content-between mb-4">
//         <h4 className="fw-semibold">Your sessions</h4>
//         <Button variant="dark" onClick={() => alert('Redirect to session booking')}>Book a session</Button>
//       </div>

//       {/* Group classes you can join */}
//       <div className="d-flex align-items-center justify-content-between mt-5 mb-4">
//         <h4 className="fw-semibold">Group classes you can join</h4>
//       </div>

//       <Row>
//         {availableSessions.map((session) => (
//           <Col key={session.id + "-group"} xs={12} md={6}>
//             <SessionCard variant="button" session={session} onJoinClick={() => handleJoinClick(session)} />
//           </Col>
//         ))}
//       </Row>

//       <Row>
//         {yourSessions.map((session) => (
//           <Col key={session.id} xs={12} md={6}>
//             <SessionCard variant="button" session={session} onJoinClick={() => handleJoinClick(session)} />
//           </Col>
//         ))}
//       </Row>

//       {/* Join Session Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Join Session</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedSession && (
//             <>
//               <p><strong>Session:</strong> {selectedSession.title}</p>
//               <p><strong>Trainer:</strong> {selectedSession.trainerName}</p>
//               <p><strong>Date:</strong> {selectedSession.date} | <strong>Time:</strong> {selectedSession.time}</p>
//             </>
//           )}
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Full Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your full name"
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Phone Number</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your phone number"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Notes (optional)</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Anything you want to add..."
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
//           <Button variant="dark" onClick={handleSaveJoin}>Join</Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default MemberHome;


//------------------------------------------------------------------------------------------

// import { useEffect, useState } from "react";
// import { Button, Col, Container, Modal, Form, Row, Alert } from "react-bootstrap";
// import SessionCard from "../../components/SessionCard";

// const MemberHome = () => {
//   const [yourSessions, setYourSessions] = useState([]);
//   const [availableSessions, setAvailableSessions] = useState([]);
//   const [selectedSession, setSelectedSession] = useState(null);
//   const [showModal, setShowModal] = useState(false);
  
//   const [username, setUsername] = useState("");
//   const [notes, setNotes] = useState("");
  
//   const [error, setError] = useState(null);  // Error handling state

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
//       const midpoint = Math.floor(data.length / 2);
//       setYourSessions(data.slice(0, midpoint));
//       setAvailableSessions(data.slice(midpoint));
//     } catch (error) {
//       console.error("Error fetching sessions:", error);
//       setError("There was an issue fetching sessions. Please try again later.");
//     }
//   };

//   const handleJoinClick = (session) => {
//     setSelectedSession(session);
//     setShowModal(true);
//   };

//   const handleSaveJoin = async () => {
//     const joinDetails = {
//       username,
//       notes,
//       sessionTitle: selectedSession.title,
//       trainerName: selectedSession.trainerName,
//       date: selectedSession.date,
//       time: selectedSession.time,
//     };

//     try {
//       const response = await fetch("http://localhost:5281/api/JoinedSessions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(joinDetails),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to join session");
//       }

//       alert("You have successfully joined the session!");
//       setShowModal(false);
//       setUsername("");
//       setNotes("");
//     } catch (error) {
//       console.error("Error joining session:", error);
//       setError("There was an issue joining the session. Please try again later.");
//     }
//   };

//   return (
//     <Container fluid>
//       {/* Error Alert */}
//       {error && <Alert variant="danger">{error}</Alert>}

//       <div className="d-flex align-items-center justify-content-between mb-4">
//         <h4 className="fw-semibold">Your sessions</h4>
//         <Button variant="dark" onClick={() => alert('Redirect to session booking')}>Book a session</Button>
//       </div>

//       {/* Group classes you can join */}
//       <div className="d-flex align-items-center justify-content-between mt-5 mb-4">
//         <h4 className="fw-semibold">Group classes you can join</h4>
//       </div>

//       <Row>
//         {availableSessions.map((session) => (
//           <Col key={session.id + "-group"} xs={12} md={6}>
//             <SessionCard variant="button" session={session} onJoinClick={() => handleJoinClick(session)} />
//           </Col>
//         ))}
//       </Row>

//       <Row>
//         {yourSessions.map((session) => (
//           <Col key={session.id} xs={12} md={6}>
//             <SessionCard variant="button" session={session} onJoinClick={() => handleJoinClick(session)} />
//           </Col>
//         ))}
//       </Row>

//       {/* Join Session Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Join Session</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedSession && (
//             <>
//               <p><strong>Session:</strong> {selectedSession.title}</p>
//               <p><strong>Trainer:</strong> {selectedSession.trainerName}</p>
//               <p><strong>Date:</strong> {selectedSession.date} | <strong>Time:</strong> {selectedSession.time}</p>
//             </>
//           )}
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Username</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Notes (optional)</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Anything you want to add..."
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
//           <Button variant="dark" onClick={handleSaveJoin}>Join</Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default MemberHome;

















import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Form, Row, Alert } from "react-bootstrap";
import SessionCard from "../../components/SessionCard";

const MemberHome = () => {
  const [yourSessions, setYourSessions] = useState([]);
  const [availableSessions, setAvailableSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [username, setUsername] = useState("");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState(null);  // Error handling state
  const [successMessage, setSuccessMessage] = useState(null);  // Success message state

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
      const midpoint = Math.floor(data.length / 2);
      setYourSessions(data.slice(0, midpoint));
      setAvailableSessions(data.slice(midpoint));
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setError("There was an issue fetching sessions. Please try again later.");
    }
  };

  const handleJoinClick = (session) => {
    setSelectedSession(session);
    setShowModal(true);
  };

  const handleSaveJoin = async () => {
    const joinDetails = {
      username,
      notes,
      sessionTitle: selectedSession.title,
      trainerName: selectedSession.trainerName,
      date: selectedSession.date,
      time: selectedSession.time,
    };

    try {
      // Check if the user already joined this session
      const responseCheck = await fetch(`http://localhost:5281/api/JoinedSessions/check?username=${username}&sessionTitle=${selectedSession.title}`);
      const checkData = await responseCheck.json();
      if (!responseCheck.ok || checkData.alreadyJoined) {
        setError("You have already joined this session.");
        return;
      }

      const response = await fetch("http://localhost:5281/api/JoinedSessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(joinDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to join session");
      }

      setSuccessMessage("You have successfully joined the session!");
      setShowModal(false);
      setUsername("");
      setNotes("");
      setError(null);  // Clear any previous errors
    } catch (error) {
      console.error("Error joining session:", error);
      setError("There was an issue joining the session. Please try again later.");
      setSuccessMessage(null);  // Clear any previous success message
    }
  };

  return (
    <Container fluid>
      {/* Error Alert */}
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 className="fw-semibold">Your sessions</h4>
        <Button variant="dark" onClick={() => alert('Redirect to session booking')}>Book a session</Button>
      </div>

      {/* Group classes you can join */}
      <div className="d-flex align-items-center justify-content-between mt-5 mb-4">
        <h4 className="fw-semibold">Group classes you can join</h4>
      </div>

      <Row>
        {availableSessions.map((session) => (
          <Col key={session.id + "-group"} xs={12} md={6}>
            <SessionCard variant="button" session={session} onJoinClick={() => handleJoinClick(session)} />
          </Col>
        ))}
      </Row>

      <Row>
        {yourSessions.map((session) => (
          <Col key={session.id} xs={12} md={6}>
            <SessionCard variant="button" session={session} onJoinClick={() => handleJoinClick(session)} />
          </Col>
        ))}
      </Row>

      {/* Join Session Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Join Session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSession && (
            <>
              <p><strong>Session:</strong> {selectedSession.title}</p>
              <p><strong>Trainer:</strong> {selectedSession.trainerName}</p>
              <p><strong>Date:</strong> {selectedSession.date} | <strong>Time:</strong> {selectedSession.time}</p>
            </>
          )}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Notes (optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Anything you want to add..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="dark" onClick={handleSaveJoin}>Join</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MemberHome;
