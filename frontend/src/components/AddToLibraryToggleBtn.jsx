import * as React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { selectUserState, updateUser } from "../features/users/usersSlice";
import { selectLoginState } from "../features/login/loginSlice";
import { addNotification } from "../features/notificationMsg/notificationsSlice";
import { resetGameLibrary } from "../features/gameLibrary/gameLibrarySlice";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

const AddToLibraryToggleBtn = ({ game }) => {
  const gameId = game.id;
  const dispatch = useDispatch();
  const { token } = useSelector(selectLoginState);

  const { gameLibrary } = useSelector(selectUserState).user.data;

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
  React.useEffect(() => {
    const tooltipElement = toolTipRef.current;
    if (tooltipElement) {
      const tooltip = new bootstrap.Tooltip(tooltipElement, {
        title: gameLibrary.some((game) => game.id === gameId)
          ? "Remove from my Library"
          : "Add to my Library",
        placement: "right",
      });

      return () => {
        tooltip.dispose();
      };
    }
  }, [game, gameLibrary, gameId, dispatch]);

  const handleAddToLibrary = async () => {
    let updateContent = [...gameLibrary] || [];
    if (gameLibrary.some((game) => game.id === gameId)) {
      updateContent = updateContent.filter((game) => game.id !== gameId);
    } else {
      updateContent.push(game);
    }
    try {
      await dispatch(resetGameLibrary());
      await dispatch(
        updateUser({
          token: token.data,
          updateContent: { gameLibrary: updateContent },
        })
      );
      dispatch(
        addNotification({
          severity: "success",
          message: "Successfully updated your library",
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
        className="btn btn-outline fs-3 text-secondary"
        onClick={handleAddToLibrary}
        ref={toolTipRef}
      >
        {gameLibrary &&
        gameId &&
        gameLibrary.some((game) => game.id === gameId) ? (
          <i className="bi bi-heart-fill"></i>
        ) : (
          <i className="bi bi-heart"></i>
        )}
      </button>
    </div>
  );
};

AddToLibraryToggleBtn.propTypes = {
  game: PropTypes.object.isRequired,
};

export default AddToLibraryToggleBtn;
