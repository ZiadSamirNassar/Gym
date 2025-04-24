import {createBrowserRouter} from "react-router";
import App from "./App";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashPord from "./pages/admin/DashPord";
import Home from "./pages/Home";
import Message from "./components/chat/Message";
import MessageInput from "./components/chat/MessageInput";
import UserBadge from "./components/chat/UserBadge";
import Sidebar from "./components/chat/Sidebar";

  
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
            path: "/auth",
            children: [
              {
                path: "/auth/login",
                element: <Login />,
              },
              {
                path: "/auth/register",
                element: <Register/>,
              }
            ]
          },
          {
            path: "/chat",
            children: [
              {
                path: "/chat/message",
                element: <Message/>
              },
              {
                path: "/chat/messageinput",
                element: <MessageInput/>
              },
              {
                path: "/chat/userbadge",
                element: <UserBadge/>
              },
              {
                path: "/chat/sidebar",
                element: <Sidebar/>
              },
            ]
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