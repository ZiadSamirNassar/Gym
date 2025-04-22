import { Button } from "react-bootstrap";

const Level = ({ variant }) => {
  if (variant == "easy") { 
    return <span className="easy"> Easy </span>;
  } else if (variant == "intermediate") { 
    return <span className="intermediate"> intermediate </span>;
  } else { 
    return <span className="advanced"> advanced </span>;
  }
}

export default Level