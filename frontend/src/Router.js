import {createBrowserRouter} from "react-router";
import App from "./App";
import Login from "./pages/Login";
import {Register1, Register2} from "./pages/Register";
import Homepage from "./pages/Home";
// import GoldMembership from "./pages/goldenmemper";
import GoldMembership  from "./pages/memberships/GoldMembership";
import BlteniomMembership  from "./pages/memberships/BlteniomMembership";
import ClassicMembership  from "./pages/memberships/ClassicMembership";
  
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Homepage/>,
              },
              {
                  path: "/login",
                  element: <Login />,
              },
              {
                  path: "/register1",
                  element: <Register1/>,
              },
              {
                  path: "/register2",
                  element: <Register2/>,
              },
              {
                path: "/gold",
                element: <GoldMembership/>,
            },
            {
                path: "/classic",
                element: <ClassicMembership/>,
            },
            {
                path: "/blateniom",
                element: <BlteniomMembership/>
            },
            {
                //wild card route for 404 page
                path: "*",
                element: <div  style={{textAlign: 'center', margin: '50px', fontfamily: 'fantasy', fontSize: '50px', margin: "235px 0px"}}><span style={{color: 'red', fontSize: '90px'}}>404</span> This Page Not Found</div>,
            }
        ]
    },

    
  ]);
