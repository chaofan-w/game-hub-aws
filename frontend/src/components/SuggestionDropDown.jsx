import { resetSuggestions } from "../features/suggestions/suggestionsSlice";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const SuggestionDropDown = ({ suggestions, setSearchQuery }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      className="container-fluid w-50 bg-dark text-light px-0 rounded-2 position-absolute z-3"
      style={{
        // position: "absolute",
        top: "8vh",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <div className="list-group w-100 p-0 rounded-2">
        <div className="list-group-item bg-dark text-light px-3">
          <button
            type="button"
            className="btn-close float-end"
            aria-label="Close"
            onClick={async () => {
              await dispatch(resetSuggestions());
              await setSearchQuery("");
            }}
          ></button>
        </div>
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            className="list-group-item list-group-item-action bg-dark text-light"
            id={suggestion.id}
            type="button"
            onClick={async () => {
              await dispatch(resetSuggestions());
              await setSearchQuery("");
              navigate(`/games/${suggestion.id}`);
            }}
          >
            {suggestion.name}
          </button>
        ))}
      </div>
    </div>
  );
};

SuggestionDropDown.propTypes = {
  suggestions: PropTypes.array.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default SuggestionDropDown;
