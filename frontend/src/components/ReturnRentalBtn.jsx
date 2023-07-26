import { useDispatch, useSelector } from "react-redux";
import { deleteRentals, fetchUser } from "../features/users/usersSlice";
import { addNotification } from "../features/notificationMsg/notificationsSlice";
import { selectLoginState } from "../features/login/loginSlice";
import PropTypes from "prop-types";

const ReturnRentalBtn = ({ game }) => {
  const dispatch = useDispatch();
  const { token } = useSelector(selectLoginState);

  const handleReturnRental = async (e) => {
    e.preventDefault();
    if (!token) return alert("Please login to return rental");
    try {
      const response = await dispatch(
        deleteRentals({ token: token.data, gamesToDelete: [game] })
      );
      await dispatch(fetchUser(token.data));
      dispatch(
        addNotification({
          severity: "success",
          message: response.payload.message,
        })
      );
    } catch (error) {
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
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <button
        className="btn btn-outline text-white badge rounded-pill bg-secondary p-2 fw-medium"
        onClick={handleReturnRental}
      >
        deactivate
        {/* <i className="bi bi-trash-fill"></i> */}
      </button>
    </div>
  );
};

ReturnRentalBtn.propTypes = {
  game: PropTypes.object.isRequired,
};
export default ReturnRentalBtn;
