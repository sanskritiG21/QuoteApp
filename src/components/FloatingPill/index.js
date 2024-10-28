import React, { useState } from "react";

const FloatingPill = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`fixed bottom-0 right-0 m-10 bg-purple-500 h-10 w-10 rounded-full text-white flex items-center justify-center cursor-pointer transition-all duration-300  ${
        isHovered ? "w-40" : "w-10"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {isHovered ? "Create Quote" : "+"}
    </div>
  );
};

export default FloatingPill;
