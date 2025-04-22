import { Outlet } from "react-router"
import Frame from "../components/Frame"

const TrainerLayout = () => {
  return (
    <>
        <Frame role="trainer"/>
        <div className="con">
            <Outlet />
        </div>
    </>
  )
}

export default TrainerLayout