import RentalRecordsTable from "./RentalRecordsTable";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/login/loginSlice";
import { selectUserState, clearUser } from "../features/users/usersSlice";
import { addNotification } from "../features/notificationMsg/notificationsSlice";
import { resetGameLibrary } from "../features/gameLibrary/gameLibrarySlice";
import { clearCart } from "../features/cart/cartSlice";

const History = () => {
  const { user } = useSelector(selectUserState);
  const closedRentals =
    user?.data?.closedRentals?.length > 0 ? user.data.closedRentals : [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUser());
    dispatch(clearCart());
    dispatch(resetGameLibrary());
    dispatch(
      addNotification({
        severity: "success",
        message: "You have successfullly logged out",
      })
    );
    navigate("/");
  };

  return (
    <div
      className="container-fluid px-0 px-md-5 py-3 position-relative h-100"
      style={{ minWidth: "320px", minHeight: "83vh" }}
    >
      <h3 className="mb-3 text-start display-5">My Gaming Profile</h3>
      {closedRentals.length === 0 && (
        <h5 className="text-center">No games activated</h5>
      )}
      {closedRentals.length > 0 &&
        closedRentals.map((game, index) => (
          <div
            className="container-fluid row row-cols-1 p-0 m-0 mb-3 rounded-3"
            key={index}
          >
            <div
              className="card d-flex justify-content-center col p-0"
              style={{ minWidth: "320px" }}
            >
              <div className="row g-0 py-0 rounded-start-3">
                <div
                  className="col-lg-3 rounded-start-3"
                  style={{
                    backgroundImage: `url(${game.background_image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "180px",
                  }}
                ></div>
                <div className="col-lg-3">
                  <div className="card-body py-3 d-flex h-100 align-items-center justify-content-center">
                    <h5 className="card-title text-secondary text-center">
                      {game.name}
                    </h5>
                  </div>
                </div>
                <div className="col-lg-6">
                  <table className="table table-striped table-hover table-bordered table-sm">
                    <thead>
                      <tr>
                        {/* <th scope="col">Order Id</th> */}
                        <th scope="col">Activate Date</th>
                        <th scope="col">End Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {game?.rentalRecords?.length > 0 &&
                        game.rentalRecords.map((record, index) => (
                          <RentalRecordsTable record={record} key={index} />
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ))}
      <div
        className="container-fluid d-flex justify-content-center mt-5"
        // style={{
        //   position: "fixed",
        //   bottom: "8vh",
        //   width: "25rem",
        //   left: "50%",
        //   transform: "translateX(-50%)",
        // }}
      >
        <div
          className="w-50 btn btn-outline-secondary text-center text-secondary p-0 align-items-center justify-content-center mb-3 d-flex flex-row"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-3 fs-2"></i>
          <small className="fw-medium" style={{ fontSize: "1rem" }}>
            Logout
          </small>
        </div>
      </div>
    </div>
  );
};

export default History;
