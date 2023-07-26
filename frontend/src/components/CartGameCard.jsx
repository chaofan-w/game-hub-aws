// eslint-disable-next-line no-unused-vars
import * as React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectLoginState } from "../features/login/loginSlice";
import AddToCartToggleBtn from "./AddToCartToggleBtn";

const CartGameCard = ({ game }) => {
  const loginStatus = useSelector(selectLoginState).loginStatus;

  return (
    <div className="card h-100 border-0 shadow">
      <img
        src={game.background_image}
        className="card-img-top"
        alt={"game image of" + game.name}
        style={{
          objectFit: "cover",
          objectPosition: "center",
          height: "60%",
        }}
      />
      <div className="card-body">
        <h2 className="card-title display-5 display-lg-3 fw-medium">
          {game.name}
        </h2>
      </div>

      <div className="card-footer">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {loginStatus && (
            <div className="d-flex justify-content-center align-items-center p-0">
              <AddToCartToggleBtn game={game} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CartGameCard.propTypes = {
  game: PropTypes.object.isRequired,
};

export default CartGameCard;
