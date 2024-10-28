import React from "react";

const ShimmerMain = () => {
  return (
    <>
      {Array(20)
        .fill()
        .map(() => (
          <div className="bg-slate-200/20 h-80 w-80 m-2 rounded-lg p-4 hover:scale-105 duration-150"></div>
        ))}
    </>
  );
};

export default ShimmerMain;
