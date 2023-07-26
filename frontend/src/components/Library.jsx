import PropTypes from "prop-types";
import GameLibraryGrid from "./GameLibraryGrid";

const Library = ({ colorMode, gridShow, setGridShow }) => {
  return (
    <div className="container-fluid px-0 px-md-3 w-100">
      <h1 className="mt-3 mx-2 text-start display-5">My Library</h1>
      <GameLibraryGrid
        colorMode={colorMode}
        gridShow={gridShow}
        setGridShow={setGridShow}
      />
    </div>
  );
};

export default Library;

Library.propTypes = {
  colorMode: PropTypes.string.isRequired,
  gridShow: PropTypes.bool.isRequired,
  setGridShow: PropTypes.func.isRequired,
};
