import {createBrowserRouter} from "react-router";
import HomeLayout from "./layouts/HomeLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
  
export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        children: [ 
          { 
            index: true,
            element: <Home />
          }, 
          { 
            path: "login", 
            element: <Login />
          }, 
          { 
            path: "register", 
            element: <Register />
          }
        ]
    },
    { 
        path: "/admin", 
        element: <AdminLayout />
    },
    {
        path: "*",
        element: <div  style={{textAlign: 'center', fontfamily: 'fantasy', fontSize: '50px', margin: "235px 0px"}}><span style={{color: 'red', fontSize: '90px'}}>404</span> This Page Not Found</div>
    }
    
  ]);
