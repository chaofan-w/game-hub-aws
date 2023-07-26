import * as React from "react";
import GameCard from "./GameCard";
import PorpTypes from "prop-types";
import GameCardSmall from "./GameCardSmall";

import { useSelector, useDispatch } from "react-redux";
import {
  selectGamesState,
  fetchGames,
  resetGames,
} from "../features/games/gamesSlice";
import { useInView } from "react-intersection-observer";
import ScrollToTopBtn from "./ScrollToTopBtn";
import SwitchGridListBtn from "./SwitchGridListBtn";
import FilterBtn from "./FilterBtn";
import { fetchGenres, selectAllGenres } from "../features/genres/genresSlice";

const GameGrid = ({ colorMode, gridShow, setGridShow }) => {
  const [gameDescription, setGameDescription] = React.useState("");
  const [gameId, setGameId] = React.useState(null);
  // const [gridShow, setGridShow] = React.useState(true);
  const dispatch = useDispatch();
  const games = useSelector(selectGamesState).games;
  const errorMsg = useSelector(selectGamesState).error;
  const [page, setPage] = React.useState(0);
  // console.log(games);
  // console.log("page: ", page);
  const loadingStatus = useSelector(selectGamesState).status;
  const genres = useSelector(selectAllGenres).data;
  const [genreId, setGenreId] = React.useState(null);

  React.useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        if (!ignore) {
          await dispatch(fetchGenres());
        }
      } catch (error) {
        if (!ignore) {
          console.log(error.message);
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [dispatch]);

  React.useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        // const response = await fetchGames({ page: page, pageSize: 12 });
        // dispatch(response);
        if (!ignore) {
          await dispatch(
            fetchGames({ page: page, pageSize: 12, filter: genreId })
          );
        }
      } catch (error) {
        if (!ignore) {
          console.log(error.message);
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [page, dispatch, genreId]);

  const [bottomRef, bottomInView] = useInView({
    threshold: 0,
  });

  React.useEffect(() => {
    if (bottomInView) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [bottomInView]);

  return (
    <div className="container-fluid py-2 px-0 px-md-3">
      <div
        className="container-fluid d-flex flex-row justify-content-between align-items-center sticky-top z-1"
        style={{ top: "9vh" }}
      >
        <SwitchGridListBtn gridShow={gridShow} setGridShow={setGridShow} />
        <FilterBtn />
      </div>

      <div className="container-fluid">
        {gridShow ? (
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-1 d-flex align-items-stretch justify-content-center px-0">
            {games &&
              games.map((game) => (
                <div
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
                  <GameCardSmall
                    game={game}
                    colorMode={colorMode}
                    gameDescription={gameDescription}
                    setGameDescription={setGameDescription}
                    gameId={gameId}
                    setGameId={setGameId}
                  />
                </div>
              ))}
          </div>
        ) : (
          <div className="row row-cols-1 g-3 d-flex align-items-stretch justify-content-center px-0">
            {games &&
              games.map((game) => (
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
                  <GameCard
                    game={game}
                    colorMode={colorMode}
                    gameDescription={gameDescription}
                    setGameDescription={setGameDescription}
                    gameId={gameId}
                    setGameId={setGameId}
                  />
                </div>
              ))}
          </div>
        )}
        {errorMsg && (
          <div className="col border border-2 border-primary rounded-3 p-1 text-center ">
            {errorMsg}
          </div>
        )}
      </div>
      {loadingStatus === "loading" && (
        <div className="d-flex justify-content-center my-5">
          <button className="btn btn-primary" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Load More...
          </button>
        </div>
      )}
      <div
        ref={bottomRef}
        className="mt-5"
        // The loading of new pages is dependent on the bottomRef div coming into view. If the GameCards are not taking up enough vertical space (perhaps due to their CSS styling or due to the properties of their parent container), the bottomRef div might already be in the viewport when the page is loaded, and scrolling won't change this fact.adding the height of the bottomRef div anchor, to ensure that the bottomRef div is not in the viewport when the page is loaded.
        style={{ height: "100px", background: "transparent" }}
      ></div>
      <ScrollToTopBtn />
      <div
        className="offcanvas offcanvas-top bg-dark text-white p-0"
        id="offcanvasFilter"
        aria-labelledby="offcanvasTopLabel"
        style={{ height: "fit-content" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasTopLabel">
            Select a Genre
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body row row-cols-1 row-cols-sm-2 row-cols-md-3 rol-cols-lg-4 g-3 p-3">
          {genres?.length > 0 &&
            genres.map((genre) => (
              <div
                className="card py-0 px-2 bg-dark border-0 btn"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                key={genre.id}
                onClick={async () => {
                  await dispatch(resetGames());
                  setGenreId(genre.id);
                  // setGenreId(genre.name.toLowerCase());
                  setPage(0);
                }}
              >
                <div className="card title bg-dark text-white border-0 text-center fw-bold py-1">
                  <small>{genre.name}</small>
                </div>
                <img
                  src={genre.image_background}
                  className="card-img-top"
                  alt={"image of" + genre.name}
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    height: "5rem",
                  }}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

GameGrid.propTypes = {
  colorMode: PorpTypes.string.isRequired,
  gridShow: PorpTypes.bool.isRequired,
  setGridShow: PorpTypes.func.isRequired,
};

export default GameGrid;
