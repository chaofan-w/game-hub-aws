import { useParams } from "react-router-dom";
import * as React from "react";
import platformIcons from "../assets/img/gamePlatformIcons.json";
import axios from "axios";
import AddToLibraryToggleBtn from "./AddToLibraryToggleBtn";
import { useSelector, useDispatch } from "react-redux";
import { selectLoginState } from "../features/login/loginSlice";
import AddToCartToggleBtn from "./AddToCartToggleBtn";
import { htmlToPlainText } from "../utils";
import { convertDateFormat } from "../utils";
import { addNotification } from "../features/notificationMsg/notificationsSlice";
import { useNavigate } from "react-router-dom";

const SingleGamePage = () => {
  const { gameId } = useParams();
  const [game, setGame] = React.useState(null);
  const loginStatus = useSelector(selectLoginState).loginStatus;
  const platformIconList = platformIcons.reduce(
    (accu, curr) => ({ ...accu, [curr.name]: curr.icon }),
    {}
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    let ignore = false;
    const fetchGame = async () => {
      try {
        const response = await axios.get(`/api/games/${gameId}`, {
          timeout: 5000,
        });
        if (!ignore) {
          setGame(response.data.data);
        }
      } catch (error) {
        // we give a 5000 timeout to the request, if it fails, we assume that the server is down, and it does not return a response object, so we check for that and display server connection failed message and redirect to home page;
        // another situation is that the server return a response object, in the code, there is the "ECONNABORTED" error code, which means that the request is aborted due to timeout, so we check for that as well, and display server connection failed message and redirect to home page;
        if (!ignore && (!error.response || error.code === "ECONNABORTED")) {
          await dispatch(
            addNotification({
              severity: "alert",
              message: "server connection failed, please try again",
            })
          );
          navigate("/");
        } else {
          console.log(error.message);
        }
      }
    };

    fetchGame();
    return () => {
      ignore = true;
    };
  }, [gameId, dispatch, navigate]);

  return (
    <div className="container-fluid py-5 px-0 px-md-5">
      {game ? (
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
                <small className="text-body-secondary mx-2">
                  Player Rating:{" "}
                </small>
                <span
                  className="fs-6 fw-medium border border-secondary border-2 p-1 rounded text-secondary"
                  style={{ minWidth: "3rem" }}
                >
                  {game.rating}
                </span>
                <small className="text-body-secondary mx-2">
                  Ratings Count:{" "}
                </small>
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
                    <span
                      className="text-start lh-sm"
                      style={{ fontSize: "0.6rem" }}
                    >
                      {platform}
                    </span>
                  </div>
                ))}
              </div>
              <div className="container-fluid p-0">
                <p className="card-text" style={{ fontSize: "1rem" }}>
                  {htmlToPlainText(game.description)}
                </p>
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
      ) : (
        <div className="container-fluid d-flex justify-content-center align-items-center align-middle">
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleGamePage;
