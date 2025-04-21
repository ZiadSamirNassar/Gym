import { router } from "./Router"
import { RouterProvider } from "react-router";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
