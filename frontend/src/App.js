import NavBar from "./shared/NavBar";
import Footer from "./shared/Footer";
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
