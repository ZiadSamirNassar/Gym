import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Outlet } from "react-router";


function App() {
  return (
    <>
    <div className="App">
      <NavBar />
    
      
      <Outlet/>

      <Footer/>
    </div>
    </>
  );
}

export default App;
