import React from "react";
import Image from 'react-bootstrap/Image';
import myImg from "../assets/images/download.jpeg";

const Topimg = () => {
    // const imgUrl = "B:/Projects/Gym management system/frontend/public/download.jpeg"
  return (
    <div className="top-img-container">
      <Image style={{ width: "100%", height: "45vh" }} src={myImg} fluid />
    </div>
  );
}

export default Topimg;