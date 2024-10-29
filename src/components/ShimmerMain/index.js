const ShimmerMain = () => {
  return (
    <>
      {Array(20)
        .fill()
        .map(() => (
          <div className="shimmer"></div>
        ))}
    </>
  );
};

export default ShimmerMain;
