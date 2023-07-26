import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartGameCard from "./CartGameCard";
import CartGameCardSmall from "./CartGameCardSmall";
import PorpTypes from "prop-types";
import { selectCartItems, clearCart } from "../features/cart/cartSlice";
import ScrollToTopBtn from "./ScrollToTopBtn";
import CheckTerms from "./CheckTerms";
import { selectLoginState } from "../features/login/loginSlice";
import { addRentals, fetchUser } from "../features/users/usersSlice";
import { addNotification } from "../features/notificationMsg/notificationsSlice";

const Cart = ({ colorMode }) => {
  const cartItems = useSelector(selectCartItems);
  const [gridShow, setGridShow] = React.useState(true);
  const [checkTerms, setCheckTerms] = React.useState(false);
  const dispatch = useDispatch();

  const errorMsg = useSelector(selectCartItems).error;
  const { token } = useSelector(selectLoginState);

  const handleSubmitRental = async (e) => {
    e.preventDefault();
    if (!token) return alert("Please login to submit rental");
    if (cartItems.length === 0) return alert("Please add games to cart");
    try {
      const response = await dispatch(
        addRentals({
          token: token.data,
          gamesInCart: cartItems,
        })
      );
      await dispatch(clearCart());
      dispatch(
        addNotification({
          severity: "success",
          message: response.payload.message,
        })
      );
      await dispatch(fetchUser(token.data));
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
    <div className="container-fluid py=5" style={{ minHeight: "90vh" }}>
      <div className="container-fluid my-2">
        <div
          className="container bg-black rounded-pill shadow-sm px-3 py-1 ms-0 d-flex justify-content-center"
          style={{ width: "8rem", "--bs-bg-opacity": ".4" }}
        >
          <div className="form-check form-switch d-flex justify-content-end align-items-center">
            <input
              className="form-check-input no-border no-outline"
              type="checkbox"
              role="switch"
              id="gridSwitchCheckDefault"
              onChange={(e) => {
                e.target.checked ? setGridShow(false) : setGridShow(true);
              }}
              defaultChecked
            />

            <label
              className="form-check-label text-light"
              htmlFor="gridSwitchCheckDefault"
            >
              {gridShow ? (
                <div className="d-flex align-items-center text-secondary">
                  <div className="badge text-secondary fs-5">
                    <i className="bi bi-columns-gap"></i>
                  </div>
                  <small>Grid</small>
                </div>
              ) : (
                <div className="d-flex align-items-center text-secondary">
                  <div className="badge text-secondary fs-5">
                    <i className="bi bi-view-list"></i>
                  </div>
                  <small>List</small>
                </div>
              )}
            </label>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        {cartItems && cartItems.length === 0 && (
          <div className="row row-cols-1 g-3 d-flex align-items-stretch justify-content-center px-0">
            <div className="col border border-0 rounded-3 px-md-3 px-lg-5 text-center">
              <h1 className="text-center">No Games in Cart, please add some</h1>
            </div>
          </div>
        )}
        {gridShow ? (
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-1 d-flex align-items-stretch justify-content-start px-0">
            {cartItems &&
              cartItems.map((game) => (
                <div
                  // key={uuidv4()}
                  key={game.id}
                  className="col border border-0 rounded-3 text-center h-100 px-0 mx-2"
                  style={{
                    maxWidth: "360px",
                    minWidth: "240px",
                    maxHeight: "90vh",
                    height: "18rem",
                    overflow: "hidden",
                  }}
                >
                  <CartGameCardSmall game={game} colorMode={colorMode} />
                </div>
              ))}
          </div>
        ) : (
          <div className="row row-cols-1 g-3 d-flex align-items-stretch justify-content-center px-0">
            {cartItems &&
              cartItems.map((game) => (
                <div
                  // key={uuidv4()}
                  key={game.id}
                  className="col border border-0 rounded-3 px-md-3 px-lg-5 text-center"
                  style={{
                    maxWidth: "960px",
                    minWidth: "300px",
                    // maxHeight: "90vh",
                    height: "fit-content",
                  }}
                >
                  <CartGameCard game={game} colorMode={colorMode} />
                </div>
              ))}
          </div>
        )}
        {cartItems && cartItems.length > 0 && (
          <div className="container-fluid mx-2 px-0">
            <CheckTerms checkTerms={checkTerms} setCheckTerms={setCheckTerms} />
            <button
              type="button"
              className="btn btn-secondary px-5 mb-5"
              disabled={!checkTerms}
              onClick={handleSubmitRental}
            >
              <small className="fw-bold text-white fs-4">Submit Rental</small>
            </button>
          </div>
        )}

        {errorMsg && (
          <div className="col border border-2 border-primary rounded-3 p-1 text-center ">
            {errorMsg}
          </div>
        )}
      </div>

      <ScrollToTopBtn />
    </div>
  );
};

Cart.propTypes = {
  colorMode: PorpTypes.string.isRequired,
};

export default Cart;
