import React from "react";
import LoginCard from "./LoginCard";

const Login = () => {
  return (
    <div className=" bg-gradient-to-b from-blue-950 via-purple-800 to-gray-950 text-white">
      <div className="container py-8 md:py-20 m-auto flex justify-center items-center">
        <LoginCard />
      </div>
    </div>
  );
};

export default Login;
