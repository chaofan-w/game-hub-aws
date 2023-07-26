import * as React from "react";
import PropTypes from "prop-types";
import Joi from "joi";
import { addNotification } from "../features/notificationMsg/notificationsSlice";
import { useDispatch } from "react-redux";
import { userRegister } from "../features/users/usersSlice";
import { useNavigate } from "react-router-dom";

const schema = Joi.object({
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string()
    .min(3)
    .max(255)
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string().min(3).max(255).required(),
});

// eslint-disable-next-line no-unused-vars
const Signup = ({ colorMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialFormData = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = React.useState(initialFormData);
  const initialErrors = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  };
  const [newErrors, setNewErrors] = React.useState(initialErrors);
  const [checkTerms, setCheckTerms] = React.useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      const updateErrors = { ...initialErrors };
      error.details.forEach((err) => {
        updateErrors[err.path[0]] = err.message;
      });

      if (updateErrors) {
        await setNewErrors(updateErrors);
      }
      return;
    }
    setNewErrors(initialErrors);
    try {
      const response = await dispatch(userRegister(formData));
      if (response.payload.status !== 200) {
        if (response.payload.message.includes("Username")) {
          setNewErrors((prev) => {
            return { ...prev, username: response.payload.message };
          });
          return;
        } else if (response.payload.message.includes("Email")) {
          setNewErrors((prev) => {
            return { ...prev, email: response.payload.message };
          });
          return;
        } else {
          dispatch(
            addNotification({
              severity: "alert",
              message: response.payload.message || "An unknown error occurred",
            })
          );
          return;
        }
      }

      dispatch(
        addNotification({
          severity: "success",
          message: response.payload.message || "User registered successfully",
        })
      );
      setFormData(initialFormData);
      navigate("/login");
    } catch (error) {
      console.log(error);
      let errorMessage = "An unknown error occurred";
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message;
      }
      dispatch(
        addNotification({
          severity: "alert",
          message: errorMessage,
        })
      );
    }
  };

  return (
    <div
      className="w-100 h-100 bg-secondary py-5 d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background:
          "url(https://media.rawg.io/media/games/9f3/9f3c513b301d8d7250a64dd7e73c62df.jpg) no-repeat center center fixed",
        backgroundSize: "cover",
      }}
    >
      <div
        className="container p-3 p-md-5 shadow-lg rounded-3 w-75 w-md-25"
        style={{
          maxWidth: "480px",
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(var(--bs-primary-rgb), .8)",
        }}
      >
        <a
          className="btn-close position-absolute top-0 end-0 mt-3 me-3"
          href="/"
          aria-label="Close"
        ></a>
        <form onSubmit={handleSubmit}>
          {newErrors.firstName && (
            <small className="text-warning">{newErrors.firstName}</small>
          )}
          <div className="form-floating mb-3 ">
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="firstName"
              aria-describedby="firstNameHelp"
              placeholder="First Name"
            />
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
          </div>
          {newErrors.lastName && (
            <small className="text-warning">{newErrors.lastName}</small>
          )}
          <div className="form-floating mb-3 ">
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="lastName"
              aria-describedby="lastNameHelp"
              placeholder="Last Name"
            />
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
          </div>
          {newErrors.username && (
            <small className="text-warning">{newErrors.username}</small>
          )}
          <div className="form-floating mb-3 ">
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="username"
              aria-describedby="userNameHelp"
              placeholder="User Name"
              autoComplete="username"
            />
            <label htmlFor="username" className="form-label">
              User Name
            </label>
          </div>
          {newErrors.email && (
            <small className="text-warning">{newErrors.email}</small>
          )}
          <div className="form-floating mb-3 ">
            <input
              onChange={handleChange}
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Email"
              autoComplete="username"
            />
            <label htmlFor="email" className="form-label">
              Email address
            </label>
          </div>
          {newErrors.password && (
            <small className="text-warning">{newErrors.password}</small>
          )}
          <div className="form-floating mb-3 ">
            <input
              onChange={handleChange}
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              autoComplete="current-password"
            />
            <label htmlFor="password" className="form-label">
              Password
            </label>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="checkSignupTerms"
              onChange={() => {
                setCheckTerms(!checkTerms);
              }}
            />
            <label className="form-check-label" htmlFor="checkSignupTerms">
              Agree to Terms of Service
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-secondary text-white w-100"
            disabled={
              !checkTerms ||
              !formData.firstName ||
              !formData.lastName ||
              !formData.username ||
              !formData.email ||
              !formData.password
            }
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

Signup.propTypes = {
  colorMode: PropTypes.string.isRequired,
};

export default Signup;
