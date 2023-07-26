import * as React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { addNotification } from "../features/notificationMsg/notificationsSlice";
import {
  addToCart,
  removeFromCart,
  selectCartItems,
} from "../features/cart/cartSlice";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { selectUserState } from "../features/users/usersSlice";

const AddToCartToggleBtn = ({ game }) => {
  const { openRentals } = useSelector(selectUserState).user.data;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const gamesIdsInOpenRentals =
    openRentals?.length > 0 ? openRentals.map((rental) => rental.id) : [];

  // eslint-disable-next-line no-unused-vars
  const [shouldInitializeTooltips, setShouldInitializeTooltips] =
    React.useState(true);

  React.useEffect(() => {
    if (shouldInitializeTooltips) {
      const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );

      const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
      // Cleanup function
      return () => {
        tooltipList.forEach((tooltip) => tooltip.dispose());
      };
    }
  }, [shouldInitializeTooltips]);

  const toolTipRef = React.useRef(null);

  const { id, name, background_image } = game;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  // const allCartItemsIds = cartItems ? cartItems.map((game) => game.id) : [];

  React.useEffect(() => {
    const tooltipElement = toolTipRef.current;
    if (tooltipElement) {
      const tooltip = new bootstrap.Tooltip(tooltipElement, {
        title: gamesIdsInOpenRentals.includes(id)
          ? "This game is currently in an open rental."
          : cartItems.some((item) => item.id === id)
          ? "Remove from Cart"
          : "Add to Cart",
        // title: cartItems.some((item) => item.id === id)
        //   ? "Remove from Cart"
        //   : "Add to Cart",
        placement: "left",
      });

      return () => {
        tooltip.dispose();
      };
    }
  }, [id, cartItems, dispatch, gamesIdsInOpenRentals]);

  const handleAddToCart = async () => {
    try {
      const updateContent = { id, name, background_image };
      if (cartItems.some((item) => item.id === id)) {
        await dispatch(removeFromCart(id));
      } else {
        await dispatch(addToCart(updateContent));
      }
      dispatch(
        addNotification({
          severity: "success",
          message: "Successfully updated your cart",
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
        ref={toolTipRef}
        className={`btn btn-outline border-0 fs-3 text-${
          gamesIdsInOpenRentals.includes(id) ? "var(--bs-gray)" : "secondary"
        }`}
        onClick={handleAddToCart}
        disabled={gamesIdsInOpenRentals.includes(id)}
      >
        {gamesIdsInOpenRentals.includes(id) ? (
          <i className="bi bi-bag-check"></i>
        ) : cartItems.some((item) => item.id === id) ? (
          <i className="bi bi-bag-dash-fill"></i>
        ) : (
          <i className="bi bi-bag-plus-fill"></i>
        )}
      </button>
    </div>
  );
};

AddToCartToggleBtn.propTypes = {
  game: PropTypes.object.isRequired,
};

export default AddToCartToggleBtn;
