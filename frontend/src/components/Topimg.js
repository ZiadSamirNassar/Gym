import React from "react";
import Image from 'react-bootstrap/Image';

const Topimg = () => {
    // const imgUrl = "B:/Projects/Gym management system/frontend/public/download.jpeg"
  return (
    <div className="top-img-container">
      <Image style={{ width: "100%", height: "40vh" }} src="https://picsum.photos/200/300" fluid />
    </div>
  );
}

export default Topimg;