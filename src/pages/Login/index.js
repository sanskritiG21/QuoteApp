import "./styles.css";
import LoginVector from "../../assets/Mobile login-amico.png";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="dashboard-container">
      <div className="login-container">
        <div className="login-card-container">
          <div className="login-card-sub-container-lg">
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
      </div>
    </div>
  );
};

export default Login;
