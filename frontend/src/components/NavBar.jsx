// eslint-disable-next-line no-unused-vars
import * as React from "react";
import SearchBar from "./SearchBar";
import PropTypes from "prop-types";
import logo from "../assets/img/gamehub_logo.svg";
import CartBtn from "./CartBtn";
import { selectLoginState } from "../features/login/loginSlice";
import { useSelector } from "react-redux";
import { selectSuggestions } from "../features/suggestions/suggestionsSlice";
import SuggestionDropDown from "./SuggestionDropDown";

const NavBar = ({ colorMode, setColorMode }) => {
  const { loginStatus } = useSelector(selectLoginState);
  const suggestions = useSelector(selectSuggestions);
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <nav className="navbar navbar-expand-md bg-dark position-relative h-100">
      <div className="container-fluid d-flex align-items-center">
        <a className="navbar-brand text-altGold me-0" href="/">
          <span>
            {/* <i className="bi bi-controller"></i> */}
            <img
              src={logo}
              alt="logo"
              style={{ height: "1rem", width: "6rem" }}
            />
          </span>
        </a>

        <SearchBar
          colorMode={colorMode === "Dark Mode" ? "dark" : "light"}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {loginStatus && <CartBtn />}

        <div className="form-check form-switch d-none d-md-block m-0">
          <input
            className="form-check-input no-border no-outline"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onChange={(e) => {
              e.target.checked
                ? setColorMode("Dark Mode")
                : setColorMode("Light Mode");
            }}
            defaultChecked
          />

          <label
            className="form-check-label text-light"
            htmlFor="flexSwitchCheckDefault"
          >
            {colorMode}
          </label>
        </div>
      </div>
      {suggestions && suggestions.length > 0 && (
        <SuggestionDropDown
          suggestions={suggestions}
          setSearchQuery={setSearchQuery}
        />
      )}
    </nav>
  );
};

NavBar.propTypes = {
  colorMode: PropTypes.string.isRequired,
  setColorMode: PropTypes.func.isRequired,
};

export default NavBar;
