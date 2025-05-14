import { createBrowserRouter } from "react-router";
import HomeLayout from "./layouts/HomeLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MemberLayout from "./layouts/MemberLayout";
import MemberHome from "./pages/member/MemberHome";
import TrainerLayout from "./layouts/TrainerLayout";
import MemberPlans from "./pages/member/MemberPlans";
import TrainerHome from "./pages/trainer/TrainerHome";
import TrainerClients from "./pages/trainer/TrainerClients";
import Chat from "./pages/Chat";
import ProtectedRoute from "./protectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
  },
  {
    path: "/m",
    element: (
      <ProtectedRoute allowedType="member">
        <MemberLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <MemberHome />,
      },
      {
        path: "plans",
        element: <MemberPlans />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
    ],
  },
  {
    path: "/t",
    element: (
      <ProtectedRoute allowedType="trainer">
        <TrainerLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <TrainerHome />,
      },
      {
        path: "clients",
        element: <TrainerClients />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <div
        style={{
          textAlign: "center",
          fontFamily: "fantasy",
          fontSize: "50px",
          margin: "235px 0px",
        }}
      >
        <span style={{ color: "red", fontSize: "90px" }}>404</span> This Page
        Not Found
      </div>
    )
  },
]);
