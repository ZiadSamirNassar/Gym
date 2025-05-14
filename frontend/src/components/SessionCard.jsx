// // import { Container, Card, Button } from 'react-bootstrap';
// // import { Alarm, CalendarPlus, Trash } from 'react-bootstrap-icons';

// // const SessionCard = ({ variant }) => {
// //   return (
// //     <Container fluid className="p-0">
// //       <Card className="mb-3 p-4 d-flex flex-row justify-content-between align-items-center rounded-4 border-3">
// //         <div>
// //             <div className="d-flex mb-2">
// //               <Card.Title className="fs-5 m-0">Leg day</Card.Title><br/>
// //             </div>
// //             <Card.Subtitle className="fs-6 fw-semibold text-secondary">By Ahmed Abdelaleem</Card.Subtitle>
// //         </div>
// //         <div className="d-flex gap-5 align-items-center">
// //           <div>
// //             <div fw-semibold fs-6 text-secondary><CalendarPlus color="gray"/> 20/3</div>
// //             <div fw-semibold fs-6 text-secondary><Alarm color="gray"/> 10am</div>
// //           </div>
          
// //           { variant == "trash" && 
// //             <Button variant="danger" size="sm" className="shadow" style={{height: "40px", width: "40px"}}><Trash size={22}/></Button>
// //           }
          
// //           { variant == "button" && 
// //             <Button variant="dark" size="sm" className="px-5 py-2 rounded-1 shadow">JOIN</Button>
// //           }
          
// //         </div>
// //       </Card>
// //     </Container>
// //   )
// // }

// // export default SessionCard






// import { Container, Card, Button } from 'react-bootstrap';
// import { Alarm, CalendarPlus, Trash } from 'react-bootstrap-icons';

// const SessionCard = ({ session, variant }) => {
//   // Optional: format date and time nicely
//   const formattedDate = new Date(session.date).toLocaleDateString(); 
//   const formattedTime = session.time; // Adjust if needed

//   return (
//     <Container fluid className="p-0">
//       <Card className="mb-3 p-4 d-flex flex-row justify-content-between align-items-center rounded-4 border-3">
//         <div>
//           <div className="d-flex mb-2">
//             <Card.Title className="fs-5 m-0">{session.title}</Card.Title>
//           </div>
//           <Card.Subtitle className="fs-6 fw-semibold text-secondary">
//             By {session.trainerName}
//           </Card.Subtitle>
//         </div>

//         <div className="d-flex gap-5 align-items-center">
//           <div>
//             <div className="fw-semibold fs-6 text-secondary">
//               <CalendarPlus color="gray" className="me-1" /> {formattedDate}
//             </div>
//             <div className="fw-semibold fs-6 text-secondary">
//               <Alarm color="gray" className="me-1" /> {formattedTime}
//             </div>
//           </div>

//           {variant === "trash" && (
//             <Button
//               variant="danger"
//               size="sm"
//               className="shadow d-flex justify-content-center align-items-center"
//               style={{ height: "40px", width: "40px" }}
//             >
//               <Trash size={22} />
//             </Button>
//           )}

//           {variant === "button" && (
//             <Button
//               variant="dark"
//               size="sm"
//               className="px-5 py-2 rounded-1 shadow"
//             >
//               JOIN
//             </Button>
//           )}
//         </div>
//       </Card>
//     </Container>
//   );
// };

// export default SessionCard;























import { Container, Card, Button } from 'react-bootstrap';
import { Alarm, CalendarPlus, Trash } from 'react-bootstrap-icons';

const SessionCard = ({ session, variant, onJoinClick }) => {
  return (
    <Container fluid className="p-0">
      <Card className="mb-3 p-4 d-flex flex-row justify-content-between align-items-center rounded-4 border-3">
        <div>
          <div className="d-flex mb-2">
            <Card.Title className="fs-5 m-0">{session.title}</Card.Title>
          </div>
          <Card.Subtitle className="fs-6 fw-semibold text-secondary">By {session.trainerName}</Card.Subtitle>
        </div>
        <div className="d-flex gap-5 align-items-center">
          <div>
            <div className="fw-semibold fs-6 text-secondary">
              <CalendarPlus color="gray" /> {session.date}
            </div>
            <div className="fw-semibold fs-6 text-secondary">
              <Alarm color="gray" /> {session.time}
            </div>
          </div>

          {variant === "trash" && (
            <Button variant="danger" size="sm" className="shadow" style={{ height: "40px", width: "40px" }}>
              <Trash size={22} />
            </Button>
          )}

          {variant === "button" && (
            <Button
              variant="dark"
              size="sm"
              className="px-5 py-2 rounded-1 shadow"
              onClick={onJoinClick}
            >
              JOIN
            </Button>
          )}
        </div>
      </Card>
    </Container>
  );
};

export default SessionCard;
