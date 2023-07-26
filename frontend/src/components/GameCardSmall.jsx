// eslint-disable-next-line no-unused-vars
import * as React from "react";
import PropTypes from "prop-types";
import platformIcons from "../assets/img/gamePlatformIcons.json";
import AddToLibraryToggleBtn from "./AddToLibraryToggleBtn";
import { useSelector } from "react-redux";
import { selectLoginState } from "../features/login/loginSlice";
import AddToCartToggleBtn from "./AddToCartToggleBtn";
import { convertDateFormat } from "../utils";
import { useNavigate } from "react-router-dom";

const GameCardSmall = ({ game, gameId, setGameId }) => {
  const loginStatus = useSelector(selectLoginState).loginStatus;
  const platformIconList = platformIcons.reduce(
    (accu, curr) => ({ ...accu, [curr.name]: curr.icon }),
    {}
  );

  const [cardWidth, setCardWidth] = React.useState(null);

  const cardRef = React.useRef(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth);
    }
  }, [gameId]);

  return (
    <div
      className={`card h-100 position-relative border-0
      `}
      ref={cardRef}
      style={{
        width: gameId === game.id ? `${cardWidth}px` : "auto",
        maxHeight: gameId === game.id ? "450px" : "auto",
        position: gameId === game.id ? "absolute" : "static",
        zIndex: gameId === game.id ? "100" : "initial",
      }}
    >
      {loginStatus && (
        <div className="position-absolute w-100 top-0 start-0 z-index-10 d-flex justify-content-between align-items-center">
          <div
            className="d-flex justify-content-start align-items-center p-0"
            style={{
              backgroundColor: "rgba(var(--bs-primary-rgb),.8)",
              height: "2.5rem",
              width: "2.5rem",
            }}
          >
            <AddToLibraryToggleBtn game={game} />
          </div>
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
      <div
        className={`card card-body p-0 position-absolute top-0 start-${
          gameId === game.id ? 0 : "100"
        } m-0 p-0 rounded-top rounded-bottom-0 border-0 ${
          gameId === game.id ? "custom-slide-in" : "custom-slide-out"
        }
        ${gameId !== game.id && "d-none"}}`}
        style={{
          width: "100%",
          height: "8rem",
          // overflow: "hidden",
        }}
      >
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between">
            <small className="text-body-secondary">Player Rating:</small>
            <small className="text-body-secondary">{game.rating}</small>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <small className="text-body-secondary">Rating Count:</small>
            <small className="text-body-secondary">{game.ratings_count}</small>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <small className="text-body-secondary">Released:</small>
            <small className="text-body-secondary">
              {convertDateFormat(game.released)}
            </small>
          </li>
        </ul>
      </div>
      {/* )} */}
      <div className="card-body">
        <h2
          className="card-title fs-5 display-lg-3 fw-medium btn"
          onClick={() => {
            navigate(`/games/${game.id}`);
          }}
        >
          {game.name}
        </h2>
        <div className="container-fluid">
          <div className="row row-cols-5">
            {game?.platforms?.map((platform, index) => (
              <div
                className="col d-flex justify-content-start align-items-center"
                key={"platform_" + index}
              >
                <span className="badge me-1 text-secondary fs-6">
                  <i className={platformIconList[platform]}></i>
                </span>
              </div>
            ))}
          </div>
          <small
            className="card-text text-body-secondary border border-1 w-50 mx-auto rounded-pill px-3 shadow-sm fw-bold "
            onMouseOver={() => {
              if (typeof setGameId === "function") {
                setGameId(game.id);
              }
            }}
            onMouseLeave={() => {
              if (typeof setGameId === "function") {
                setGameId(null);
              }
            }}
          >
            {"Player Rating"}
          </small>
        </div>
      </div>
    </div>
  );
};

GameCardSmall.propTypes = {
  game: PropTypes.object.isRequired,
  gameId: PropTypes.number,
  setGameId: PropTypes.func.isRequired,
};

export default GameCardSmall;
