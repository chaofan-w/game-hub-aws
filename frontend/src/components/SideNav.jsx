import * as React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectLoginState } from "../features/login/loginSlice";
import { selectUserState, fetchUser } from "../features/users/usersSlice";

// eslint-disable-next-line no-unused-vars
const SideNav = ({ colorMode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginStatus, token } = useSelector(selectLoginState);
  const { user } = useSelector(selectUserState);

  React.useEffect(() => {
    const fetchCurrentUser = async () => {
      if (loginStatus) {
        dispatch(fetchUser(token.data));
      }
    };
    fetchCurrentUser();
  }, [loginStatus, token, dispatch]);

  // const handleLogout = () => {
  //   dispatch(logout());
  //   dispatch(clearUser());
  //   dispatch(clearCart());
  //   dispatch(resetGameLibrary());
  //   dispatch(
  //     addNotification({
  //       severity: "success",
  //       message: "You have successfullly logged out",
  //     })
  //   );
  //   navigate("/");
  // };

  return (
    <div className="container-fluid px-0 position-relative">
      <ul
        className="list-group px-0"
        style={{ position: "fixed", top: "10vh" }}
      >
        <li className="list-group-item bg-transparent border-0 fs-1 fw-medium text-start px-0 py-0">
          <div
            className="container-fluid btn rounded-0 border-0 fs-1 btn-hover-custom fw-bold text-start text-white"
            onClick={() => {
              navigate("/");
            }}
          >
            <span>
              <i className="bi bi-house-add-fill me-3 fs-3"></i>
            </span>
            <span className="d-none d-lg-inline fs-3">Home</span>
          </div>
        </li>
        {!user && (
          <li className="list-group-item bg-transparent border-0 fs-1 fw-medium text-start px-0 py-0">
            <div
              className="container-fluid btn rounded-0 border-0 fs-1 btn-hover-custom fw-bold text-start text-white"
              onClick={() => {
                navigate("/login");
              }}
            >
              <span>
                <i className="bi bi-box-arrow-in-right me-3 fs-3"></i>
              </span>
              <span className="d-none d-lg-inline fs-3">Login</span>
            </div>
          </li>
        )}
        {user && user.data && (
          <>
            <li className="list-group-item bg-transparent border-0 fs-1 fw-medium text-start px-0 py-0">
              <div
                className="container-fluid btn rounded-0 border-0 fs-1 btn-hover-custom fw-bold text-start text-white"
                onClick={() => {
                  navigate("/history");
                }}
              >
                <span>
                  <i className="bi bi-person-square me-3 fs-3"></i>
                </span>
                <span className="d-none d-lg-inline fs-3">Profile</span>
              </div>
            </li>
            <li className="list-group-item bg-transparent border-0 fs-1 fw-medium text-start px-0 py-0">
              <div
                className="container-fluid btn rounded-0 border-0 fs-1 btn-hover-custom fw-bold text-start text-white"
                onClick={() => {
                  navigate("/playing");
                }}
              >
                <span>
                  <i className="bi bi-controller me-3 fs-3"></i>
                </span>
                <span className="d-none d-lg-inline fs-3">Playing</span>
              </div>
            </li>

            <li className="list-group-item bg-transparent border-0 fs-1 fw-medium text-start px-0 py-0">
              <div
                className="container-fluid btn rounded-0 border-0 fs-1 btn-hover-custom fw-bold text-start text-white"
                onClick={() => {
                  navigate("/library");
                }}
              >
                <span>
                  <i className="bi bi-collection me-3 fs-3"></i>
                </span>
                <span className="d-none d-lg-inline fs-3">Library</span>
              </div>
            </li>
          </>
        )}
        {!user && (
          <li className="list-group-item bg-transparent border-0 fs-1 fw-medium text-start px-0 py-0">
            <div
              className="container-fluid btn rounded-0 border-0 fs-1 btn-hover-custom fw-bold text-start text-white"
              onClick={() => {
                navigate("/signup");
              }}
            >
              <span>
                <i className="bi bi-people-fill me-3 fs-3"></i>
              </span>
              <span className="d-none d-lg-inline fs-3">Join</span>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

SideNav.propTypes = {
  colorMode: PropTypes.string.isRequired,
};

export default SideNav;
