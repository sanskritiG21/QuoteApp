import React from "react";
import LoginVector from "../../assets/Mobile login-amico.png";
import LoginForm from "./LoginForm";

const LoginCard = () => {
  return (
    <div className="bg-gray-400/20 rounded-xl lg:h-[80vh] p-5 md:mx-5 lg:mx-10 text-white flex items-center">
      <div className="lg:flex lg:items-center ">
        <div className="container">
          <img
            src={LoginVector}
            alt="login-vector"
            className="max-h-full/50 max-w-full/50 md:max-h-[80%] md:max-w-[80%] lg:max-h-full lg:max-w-full m-auto"
          />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginCard;
