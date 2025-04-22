import { Outlet } from "react-router"
import Frame from "../components/Frame"

const MemberLayout = () => {
  return (
    <>
        <Frame role="member"/>
        <div className="con">
            <Outlet />
        </div>
    </>
  )
}

export default MemberLayout