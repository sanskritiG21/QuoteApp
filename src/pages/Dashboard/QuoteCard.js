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
      className="card-main"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="card-layover"></div>
      <div className="quote-layout z-2">
        <div className="truncated-text">{getTruncatedText(text)}</div>
        {isHovered && (
          <div className="creator-info">
            <div>{username}</div>
            <div>{formatDate(createdAt)}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteCard;
