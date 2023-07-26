import * as React from "react";
import PropTypes from "prop-types";
import { userLogin, selectLoginState } from "../features/login/loginSlice";
import { useSelector, useDispatch } from "react-redux";
import { addNotification } from "../features/notificationMsg/notificationsSlice";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const Login = ({ colorMode }) => {
  const { token, loginStatus, error } = useSelector(selectLoginState);
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("guest@email.com");
  const [password, setPassword] = React.useState("guest");
  const navigate = useNavigate();

  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),

    password: Joi.string().min(3).max(255).required(),
  });

  React.useEffect(() => {
    if (loginStatus) {
      dispatch(
        addNotification({
          severity: "success",
          message: token.message,
        })
      );
    }
    if (error) {
      dispatch(
        addNotification({
          severity: "alert",
          message: error,
        })
      );
    }
  }, [loginStatus, token, error, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = schema.validate({ email, password });
    if (error) {
      dispatch(
        addNotification({
          severity: "alert",
          message: error.details[0].message,
        })
      );
      return;
    }
    await dispatch(userLogin({ email, password }));

    setEmail("");
    setPassword("");
    dispatch(
      addNotification({
        severity: "success",
        message: "You have successfully logged in",
      })
    );
    navigate("/history");
  };

  return (
    <div
      className="w-100 h-100 bg-secondary py-5 d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background:
          "url(https://media.rawg.io/media/games/bd2/bd2cc7714e0b9b1adad1ba1b2400d436.jpg) no-repeat center center fixed",
        backgroundSize: "cover",
      }}
    >
      <div
        className="container p-3 p-md-5 shadow-lg rounded-3 w-75 w-md-25"
        style={{
          maxWidth: "480px",
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(var(--bs-secondary-rgb), .8)",
        }}
      >
        <a
          className="btn-close position-absolute top-0 end-0 mt-3 me-3"
          href="/"
          aria-label="Close"
        ></a>
        <form>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoComplete="username"
            />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="current-password"
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Keep me logged in
            </label>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <div className="mb-3 text-white">
              <small>
                Do not have an account?{" "}
                <button
                  className="text-black btn btn-outline border-0"
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </button>
              </small>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  colorMode: PropTypes.string.isRequired,
};

export default Login;
