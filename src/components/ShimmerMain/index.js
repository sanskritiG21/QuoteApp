import React from "react";

const ShimmerMain = () => {
  return (
    <>
      {Array(10)
        .fill()
        .map(() => (
          <div className="bg-slate-200/20 h-80 w-80 m-2 rounded-lg p-4 hover:scale-105 duration-150">
            Shimmer
          </div>
        ))}
    </>
  );
};

export default ShimmerMain;
