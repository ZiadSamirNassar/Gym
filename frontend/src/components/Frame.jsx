import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import PlanLabel from './PlanLabel';
import { House, ClipboardCheck, ChatDots, People } from 'react-bootstrap-icons';
import { Link, Navigate } from 'react-router';

const Frame = ({ role }) => {
  const membershipPlan = localStorage.getItem("membershipPlanName");


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    localStorage.removeItem("membershipPlanName");
    window.location.href = "/login";
  }
  return (
    <>
      <Navbar bg="white" expand="lg" className="z-3 position-fixed shadow-sm py-2 px-4 w-100" style={{ borderBottom: '1px solid #eee' }}>
        <Container fluid className="d-flex justify-content-between align-items-center" style={{height: "42px"}}>
          <Link to="/" className="fs-5 fw-bold text-decoration-none text-black" >BIG GYM</Link>

          { role === "member" &&
            <div className="d-flex align-items-center gap-4">
              <PlanLabel variant={membershipPlan}/>
            </div>
          }
        </Container>
      </Navbar>
      <div className="position-fixed bg-white shadow-sm" style={{ top: '60px', left: '0', width: '300px', height: '100vh', borderRight: '1px solid #eee' }}>
        <Container fluid className="d-flex flex-column gap-3 align-items-center py-4">
          <Link to={ role === "member" ? "/m" : "/t" } className=" text-decoration-none d-flex align-items-center gap-3 justify-content-start bg-black text-white w-75 p-3 rounded-3">
            <House size={22} />
            <div>dashboard</div>
          </Link>

          { role === "member" &&  
            <Link to="/m/plans" className="text-decoration-none d-flex align-items-center gap-3 justify-content-start bg-black text-white w-75 p-3 rounded-3">
              <ClipboardCheck size={22} />
              <div>Training plan</div>
            </Link>
          }

          { role === "trainer" &&
            <Link to="/t/clients" className="text-decoration-none d-flex align-items-center gap-3 justify-content-start bg-black text-white w-75 p-3 rounded-3">
              <People size={22} />
              <div>Clients</div>
            </Link>
          }

          <Link to={ role === "member" ? "/m/chat" : "/t/chat" } className="text-decoration-none d-flex align-items-center gap-3 justify-content-start bg-black text-white w-75 p-3 rounded-3">
            <ChatDots size={22} />
            <div>Chat</div>
          </Link>

          <div onClick={logout} className="text-decoration-none d-flex align-items-center gap-3 justify-content-start bg-black text-white w-75 p-3 rounded-3">
            <ChatDots size={22} />
            <div>Log out</div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Frame