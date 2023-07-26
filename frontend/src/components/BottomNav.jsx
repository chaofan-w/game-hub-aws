import * as React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectLoginState } from "../features/login/loginSlice";
import { selectUserState, fetchUser } from "../features/users/usersSlice";

// eslint-disable-next-line no-unused-vars
const BottomNav = ({ colorMode }) => {
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

  return (
    // <div className="container-fluid px-0">
    <ul className="list-group px-0 d-flex flex-row justify-content-around w-100 h-100">
      <li className="list-group-item bg-transparent border-0 fs-1 fw-medium text-start px-0 py-0">
        <div
          className="container-fluid btn rounded-0 border-0 fs-1 bottomNav-btn-hover-custom fw-bold text-start text-white"
          onClick={() => {
            navigate("/");
          }}
        >
          <span>
            <i className="bi bi-house-add-fill me-3 fs-2"></i>
          </span>
          <span className="d-none d-lg-inline fs-2">Home</span>
        </div>
      </li>
      {!user && (
        <li className="list-group-item bg-transparent border-0 fs-1 fw-medium text-start px-0 py-0">
          <div
            className="container-fluid btn rounded-0 border-0 fs-1 bottomNav-btn-hover-custom fw-bold text-start text-white"
            onClick={() => {
              navigate("/login");
            }}
          >
            <span>
              <i className="bi bi-box-arrow-in-right me-3 fs-2"></i>
            </span>
            <span className="d-none d-lg-inline fs-2">Login</span>
          </div>
        </li>
      )}
      {user && user.data && (
        <>
          <li className="list-group-item bg-transparent border-0 fs-1 fw-medium text-start px-0 py-0">
            <div
              className="container-fluid btn rounded-0 border-0 fs-1 bottomNav-btn-hover-custom fw-bold text-start text-white"
              onClick={() => {
                navigate("/playing");
              }}
            >
              <span>
                <i className="bi bi-controller me-3 fs-2"></i>
              </span>
              <span className="d-none d-lg-inline fs-2">Playing</span>
            </div>
          </li>
          <li className="list-group-item bg-transparent border-0 fs-1 fw-medium text-start px-0 py-0">
            <div
              className="container-fluid btn rounded-0 border-0 fs-1 bottomNav-btn-hover-custom fw-bold text-start text-white"
              onClick={() => {
                navigate("/library");
              }}
            >
              <span>
                <i className="bi bi-collection me-3 fs-2"></i>
              </span>
              <span className="d-none d-lg-inline fs-2">Library</span>
            </div>
          </li>
          <li className="list-group-item bg-transparent border-0 fs-1 fw-medium text-start px-0 py-0">
            <div
              className="container-fluid btn rounded-0 border-0 fs-1 bottomNav-btn-hover-custom fw-bold text-start text-white"
              onClick={() => {
                navigate("/history");
              }}
            >
              <span>
                <i className="bi bi-person-square me-3 fs-2"></i>
              </span>
              <span className="d-none d-lg-inline fs-2">History</span>
            </div>
          </li>
        </>
      )}
      {!user && (
        <li className="list-group-item bg-transparent border-0 fs-1 fw-medium text-start px-0 py-0">
          <div
            className="container-fluid btn rounded-0 border-0 fs-1 bottomNav-btn-hover-custom fw-bold text-start text-white"
            onClick={() => {
              navigate("/signup");
            }}
          >
            <span>
              <i className="bi bi-people-fill me-3 fs-2"></i>
            </span>
            <span className="d-none d-lg-inline fs-2">Join</span>
          </div>
        </li>
      )}
    </ul>
    // </div>
  );
};

BottomNav.propTypes = {
  colorMode: PropTypes.string.isRequired,
};

export default BottomNav;
