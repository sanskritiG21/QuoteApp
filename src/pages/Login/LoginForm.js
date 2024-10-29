import { useState } from "react";
import { login } from "../../utils/appApi";
import { setToken } from "../../utils/localstorage";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loginInfo, setLoginInfo] = useState({
    username: null,
    otp: null,
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    login(loginInfo).then((res) => {
      if (!res.error) {
        setToken(res?.data?.token);
        navigate("/app");
      } else {
        setError(true);
      }
    });
  };

  return (
    <div className="login-form-main">
      <div className="login-form-container">
        <h1 className="login-heading">Login</h1>
        {error && (
          <div className="invalid-creds">
            <p>Invalid credentials</p>
            <button onClick={() => setError(false)}>&#10005;</button>
          </div>
        )}
        <div className="mb-4">
          <label className="label-text">Username</label>
          <input
            type="text"
            className="login-input"
            onChange={(e) => {
              setLoginInfo({ ...loginInfo, username: e.target.value });
            }}
          />
        </div>
        <div className="mb-4">
          <label className="label-text">Password</label>
          <input
            type="password"
            className="login-input"
            onChange={(e) => {
              setLoginInfo({ ...loginInfo, otp: e.target.value });
            }}
          />
        </div>
        <div className="horizontal-center">
          <button
            className="login-btn"
            onClick={handleLogin}
            disabled={!loginInfo.username && !loginInfo.otp}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
