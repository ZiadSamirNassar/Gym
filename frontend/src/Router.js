import {createBrowserRouter} from "react-router";
import App from "./App";
import Login from "./pages/auth/Login";
import  Register from "./pages/auth/Register";
import DashPord from "./pages/admin/DashPord";
import Home from "./pages/Home";

  
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
          {
            path: "/",
            element: <Home/>
          },
          {
              path: "/login",
              element: <Login />,
          },
          {
              path: "/register",
              element: <Register/>,
          },
          {
            path: "/DashPord",
            element: <DashPord/>
          },
          {
            //wild card route for 404 page
            path: "*",
            element: <div  style={{textAlign: 'center', fontfamily: 'fantasy', fontSize: '50px', margin: "235px 0px"}}><span style={{color: 'red', fontSize: '90px'}}>404</span> This Page Not Found</div>,
          }
        ]
    },

    
  ]);
