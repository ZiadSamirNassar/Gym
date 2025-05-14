import { Outlet } from "react-router"

import NavBar from "../shared/NavBar"
import Footer from "../shared/Footer"


const HomeLayout = () => {
  return (
    <>
        <NavBar />
        <Outlet />
        <Footer />
    </>
  )
}

export default HomeLayout