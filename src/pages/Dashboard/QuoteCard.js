import React, { useState } from "react";
import { formatDate, getTruncatedText } from "../../utils/utilMethods";

const QuoteCard = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { mediaUrl, text, username, createdAt } = data;

  return (
    <div
      style={{
        backgroundImage: `url(${mediaUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative bg-slate-200/20 h-80 w-80 m-2 rounded-lg  hover:scale-105 duration-150 flex items-center justify-center text-white shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
      <div className="bg-black/30 h-full w-full rounded-lg z-2 flex justify-center items-center">
        <div className="text-center text-2xl text-white p-2 rounded z-10">
          {getTruncatedText(text)}
        </div>
        {isHovered && (
          <div className="text-xs absolute bottom-0 right-0 m-2">
            <div>{username}</div>
            <div>{formatDate(createdAt)}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteCard;
