// eslint-disable-next-line no-unused-vars
import * as React from "react";
import PropTypes from "prop-types";
import platformIcons from "../assets/img/gamePlatformIcons.json";
import axios from "axios";
import AddToLibraryToggleBtn from "./AddToLibraryToggleBtn";
import { useSelector } from "react-redux";
import { selectLoginState } from "../features/login/loginSlice";
import AddToCartToggleBtn from "./AddToCartToggleBtn";
import { htmlToPlainText } from "../utils";
import { convertDateFormat } from "../utils";
const apiurl = import.meta.env.VITE_APP_API_URL;

const GameCard = ({
  game,
  gameId,
  setGameId,
  gameDescription,
  setGameDescription,
}) => {
  const loginStatus = useSelector(selectLoginState).loginStatus;
  const platformIconList = platformIcons.reduce(
    (accu, curr) => ({ ...accu, [curr.name]: curr.icon }),
    {}
  );

  // React.useEffect(() => {
  //   const fetchGameDescription = async () => {
  //     try {
  //       if (gameId === null) {
  //         setGameDescription("");
  //         return;
  //       }
  //       const response = await axios.get(`/api/games/${gameId}`);
  //       if (response.data.data.description === "") {
  //         setGameDescription("No description available");
  //       }

  //       setGameDescription(response.data.data.description);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  //   let ignore = false;
  //   if (!ignore) {
  //     fetchGameDescription();
  //   }
  //   return () => {
  //     ignore = true;
  //   };
  // }, [gameId, setGameDescription]);

  return (
    <div className="card h-100 border-0 shadow">
      <div className="card-head">
        <div className="container-fluid d-flex justify-content-between align-items-center py-1">
          {loginStatus && (
            <div
              className="container-fluid d-flex justtify-content-center align-items-center p-0"
              style={{ width: "2.5rem" }}
            >
              <AddToLibraryToggleBtn game={game} />
            </div>
          )}
          <div className="container-fluid d-flex justify-content-end align-items-center py-1">
            <small className="text-body-secondary mx-2">Player Rating: </small>
            <span
              className="fs-6 fw-medium border border-secondary border-2 p-1 rounded text-secondary"
              style={{ minWidth: "3rem" }}
            >
              {game.rating}
            </span>
            <small className="text-body-secondary mx-2">Ratings Count: </small>
            <span
              className="fs-6 fw-medium border border-secondary border-2 p-1 rounded text-secondary"
              style={{ minWidth: "3rem" }}
            >
              {game.ratings_count}
            </span>
          </div>
        </div>
      </div>
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
        <div className="container-fluid">
          <div className="row row-cols-2 row-cols-md-3">
            {game.platforms.map((platform, index) => (
              <div
                className="col d-flex justify-content-start align-items-center"
                key={"platform_" + index}
              >
                <span className="badge me-1 text-secondary fs-4">
                  <i className={platformIconList[platform]}></i>
                </span>
                <small
                  className="text-start lh-sm"
                  style={{ fontSize: "0.7rem" }}
                >
                  {platform}
                </small>
              </div>
            ))}
          </div>
          <div className="container-fluid">
            <button
              className="btn btn-outline-secondary my-3"
              type="button"
              onClick={async () => {
                if (gameId === game.id) {
                  await setGameId(null);
                  await setGameDescription("");
                  return;
                }
                await setGameId(game.id);
                await setGameDescription("");
                const response = await axios.get(
                  `${apiurl}/api/games/${game.id}`
                );
                if (response.data.data.description === "") {
                  setGameDescription("No description available");
                }
                setGameDescription(response.data.data.description);
              }}
            >
              {gameId === game.id ? "show less" : "read more"}
            </button>
            {gameId === game.id && (
              <p className="card-text" style={{ fontSize: "1rem" }}>
                {htmlToPlainText(gameDescription)}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="card-footer">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <small
            className="text-body-secondary text-start"
            style={{ width: "20rem" }}
          >
            {"Released: " + convertDateFormat(game.released)}
          </small>
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

GameCard.propTypes = {
  game: PropTypes.object.isRequired,
  gameId: PropTypes.number,
  setGameId: PropTypes.func.isRequired,
  gameDescription: PropTypes.string.isRequired,
  setGameDescription: PropTypes.func.isRequired,
};

export default GameCard;
