import * as React from "react";
import GameCard from "./GameCard";
import PorpTypes from "prop-types";
import GameCardSmall from "./GameCardSmall";

import { useSelector } from "react-redux";
import {
  selectGameLibraryState,
  // fetchGameLibrary,
} from "../features/gameLibrary/gameLibrarySlice";
// import { useInView } from "react-intersection-observer";
import ScrollToTopBtn from "./ScrollToTopBtn";
import { selectUserState } from "../features/users/usersSlice";
import SwitchGridListBtn from "./SwitchGridListBtn";

const GameLibraryGrid = ({ colorMode, gridShow, setGridShow }) => {
  const { gameLibrary } = useSelector(selectUserState)?.user?.data || [];
  // const totalPage = Math.ceil(gameLibrary.length / 12);
  const [gameDescription, setGameDescription] = React.useState("");
  const [gameId, setGameId] = React.useState(null);
  // const [gridShow, setGridShow] = React.useState(true);
  // const dispatch = useDispatch();
  // const { libraryGames } = useSelector(selectGameLibraryState);
  const errorMsg = useSelector(selectGameLibraryState).error;
  // const [libraryPage, setLibraryPage] = React.useState(0);
  // console.log("libraryPage: ", libraryPage);
  // const loadingStatus = useSelector(selectGameLibraryState).status;
  // const { token } = useSelector(selectLoginState);

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       dispatch(
  //         fetchGameLibrary({
  //           libraryPage: libraryPage,
  //           libraryPageSize: 12,
  //           token: token.data,
  //         })
  //       );
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  //   let ignore = false;
  //   if (!ignore) {
  //     fetchData();
  //   }

  //   return () => {
  //     ignore = true;
  //   };
  // }, [libraryPage, dispatch, token.data, gameLibrary]);

  // const [bottomRef, bottomInView] = useInView({
  //   threshold: 0,
  // });

  // React.useEffect(() => {
  //   if (bottomInView) {
  //     setLibraryPage((prevPage) =>
  //       prevPage < totalPage ? prevPage + 1 : prevPage
  //     );
  //   }
  // }, [bottomInView]);

  return (
    <div
      className="container-fluid py-5 px-0 px-md-3"
      style={{ minHeight: "83vh" }}
    >
      <div
        className="container-fluid align-items-center sticky-top z-1"
        style={{ top: "9vh" }}
      >
        <SwitchGridListBtn gridShow={gridShow} setGridShow={setGridShow} />
      </div>

      <div className="container-fluid">
        {gameLibrary && gameLibrary.length === 0 && (
          <div className="row row-cols-1 g-3 d-flex align-items-stretch justify-content-center px-0">
            <div className="col border border-0 rounded-3 px-md-3 px-lg-5 text-center">
              <h1 className="text-center">No Games in Library</h1>
            </div>
          </div>
        )}
        {gridShow ? (
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-1 d-flex align-items-stretch justify-content-center px-0">
            {gameLibrary &&
              gameLibrary.map((game) => (
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
            {gameLibrary &&
              gameLibrary.map((game) => (
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
      {/* {loadingStatus === "loading" && (
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
        style={{ height: "100px", background: "transparent" }}
      ></div> */}
      <ScrollToTopBtn />
    </div>
  );
};

GameLibraryGrid.propTypes = {
  colorMode: PorpTypes.string.isRequired,
  gridShow: PorpTypes.bool.isRequired,
  setGridShow: PorpTypes.func.isRequired,
};

export default GameLibraryGrid;
