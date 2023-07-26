import GameGrid from "./GameGrid";
import PropTypes from "prop-types";

const Home = ({ colorMode, gridShow, setGridShow }) => {
  return (
    <div className="container-fluid d-flex p-0 justify-content-center">
      <GameGrid
        colorMode={colorMode}
        gridShow={gridShow}
        setGridShow={setGridShow}
      />
    </div>
  );
};

Home.propTypes = {
  colorMode: PropTypes.string.isRequired,
  gridShow: PropTypes.bool.isRequired,
  setGridShow: PropTypes.func.isRequired,
};

export default Home;
