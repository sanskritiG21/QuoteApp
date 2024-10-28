import React from "react";

const LoginForm = () => {
  return (
    <div className="login-container flex items-center justify-center h-full w-full p-4">
      <div className="login-form w-full max-w-md p-6 rounded-xl bg-gray-800/30 shadow-lg shadow-gray-950/20">
        <h1 className="text-center text-5xl mb-6">Login</h1>
        <div className="mb-4">
          <label className="text-sm block mb-1">Username</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-900/20 rounded-lg bg-slate-800/20 text-white text-base"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm block mb-1">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-900/20 rounded-lg bg-slate-800/20 text-white text-base"
          />
        </div>
        <div className="flex justify-center">
          <button className="text-base mt-4 p-2 px-10 bg-[#9553A0] hover:bg-purple-600 rounded-lg text-white shadow-lg shadow-gray-950/20">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
