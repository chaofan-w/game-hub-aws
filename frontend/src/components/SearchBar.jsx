import * as React from "react";
import PropTypes from "prop-types";
// import * as Popper from "@popperjs/core";
// import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useDispatch } from "react-redux";
import { fetchSuggestions } from "../features/suggestions/suggestionsSlice";

const SearchBar = ({ colorMode, searchQuery, setSearchQuery }) => {
  // eslint-disable-next-line no-unused-vars
  // const [showAltEnter, setShowAltEnter] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchSuggestions({ keyword: searchQuery }));
      } catch (error) {
        console.log(error.message);
      }
    };

    let ignore = false;
    if (!ignore) {
      fetchData();
    }

    return () => {
      ignore = true;
    };
  }, [searchQuery, dispatch]);

  return (
    <form
      className="d-flex mx-1 mx-md-5"
      role="search"
      data-bs-theme={colorMode}
      style={{ flex: 1 }}
    >
      <div className="input-group input-group-sm">
        <div className="input-group-append">
          <span
            className="input-group-text rounded-start-pill rounded-0 border-0 text-altGold"
            style={{
              height: "2rem",
              backgroundColor: `${
                colorMode === "dark"
                  ? "var(--bs-gray-700)"
                  : "var(--bs-gray-300)"
              }`,
              opacity: ".6",
            }}
          >
            <i
              className="bi bi-search btn"
              style={{ fontSize: "0.8rem" }}
              type="button"
              // onClick={handleSearch}
            ></i>
          </span>
        </div>
        <input
          className="form-control rounded-0 border-0 text-white"
          type="search"
          aria-label="Search"
          placeholder="search"
          style={{
            outline: "none",
            boxShadow: "none",
            backgroundColor: `${
              colorMode === "dark" ? "var(--bs-gray-700)" : "var(--bs-gray-300)"
            }`,
            opacity: ".6",
          }}
          onChange={(e) => setSearchQuery(e.target.value)}
          // onFocus={() => setShowAltEnter(true)}
          // onBlur={() => setShowAltEnter(false)}
          value={searchQuery || ""}
        />

        <div className="input-group-append">
          <div
            className="input-group-text rounded-end-pill rounded-0 border-0 text-altGold"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            data-bs-title="Press Alt + Enter to search"
            style={{
              fontSize: "0.8rem",
              height: "2rem",
              backgroundColor: `${
                colorMode === "dark"
                  ? "var(--bs-gray-700)"
                  : "var(--bs-gray-300)"
              }`,
              opacity: ".6",
            }}
          >
            {/* {showAltEnter ? null : (
              <>
                <p
                  className="border border-black rounded-1 mt-3"
                  style={{ "--bs-border-opacity": ".3", width: "2.3rem" }}
                >
                  alt
                </p>
                <p className="mx-1 mt-3"> + </p>
                <p
                  className="border border-black rounded-1 mt-3"
                  style={{ "--bs-border-opacity": ".3", width: "2.3rem" }}
                >
                  enter
                </p>
              </>
            )} */}
          </div>
        </div>
      </div>
    </form>
  );
};

SearchBar.propTypes = {
  colorMode: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default SearchBar;
