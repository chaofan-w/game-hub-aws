// eslint-disable-next-line no-unused-vars
import * as React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectLoginState } from "../features/login/loginSlice";
import AddToCartToggleBtn from "./AddToCartToggleBtn";

const CartGameCardSmall = ({ game }) => {
  const loginStatus = useSelector(selectLoginState).loginStatus;

  return (
    <div
      className={`card h-100 position-relative border-0
      `}
    >
      {loginStatus && (
        <div className="position-absolute w-100 top-0 start-0 z-index-10 d-flex justify-content-between align-items-center">
          <div
            className="d-flex align-items-center p-0"
            style={{
              backgroundColor: "rgba(var(--bs-primary-rgb),.8)",
              height: "2.5rem",
              width: "2.5rem",
            }}
          >
            <AddToCartToggleBtn game={game} />
          </div>
        </div>
      )}
      <img
        src={game.background_image}
        className="card-img-top"
        alt={"game image of" + game.name}
        style={{
          objectFit: "cover",
          objectPosition: "center",
          height: "8rem",
        }}
      />

      <div className="card-body">
        <h2 className="card-title fs-5 display-lg-3 fw-medium">{game.name}</h2>
      </div>
    </div>
  );
};

CartGameCardSmall.propTypes = {
  game: PropTypes.object.isRequired,
};

export default CartGameCardSmall;
