// import React from "react";
// import Image from 'react-bootstrap/Image';
// import myImg from "../assets/images/download.jpg";

// const Topimg = () => {
//      //const imgUrl = "B:/Projects/Gym management system/frontend/public/download.jpeg"
//   return (
//     <div className="top-img-container">
//       <Image style={{ width: "100%", height: "85vh" }} src={myImg} fluid />
//     </div>
//   );
// }

// export default Topimg;


import React from "react";
import Image from 'react-bootstrap/Image';
import myImg from "../assets/images/download.jpg"; // Path to your image

const Topimg = () => {
  return (
    <div className="top-img-container" style={{ position: 'relative' }}>
      <Image style={{ width: "100%", height: "80vh" }} src={myImg} fluid />
      <div
        className="welcome-text"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '3rem',
          fontWeight: 'bold',
        }}
      >
        Welcome to Our Gym
      </div>
    </div>
  );
}

export default Topimg;
