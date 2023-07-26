import PropTypes from "prop-types";

const SwitchGridListBtn = ({ gridShow, setGridShow }) => {
  return (
    <div className="my-2">
      <div
        className="container bg-black rounded-pill shadow-sm px-3 py-1 ms-0 d-flex justify-content-center"
        style={{ width: "8rem", "--bs-bg-opacity": ".4" }}
      >
        <div className="form-check form-switch d-flex justify-content-end align-items-center">
          <input
            className="form-check-input no-border no-outline"
            type="checkbox"
            role="switch"
            id="gridSwitchCheckDefault"
            onChange={() => {
              setGridShow(!gridShow);
            }}
            defaultChecked
          />

          <label
            className="form-check-label text-light"
            htmlFor="gridSwitchCheckDefault"
          >
            {gridShow ? (
              <div className="d-flex align-items-center text-secondary">
                <div className="badge text-secondary fs-5">
                  <i className="bi bi-columns-gap"></i>
                </div>
                <small>Grid</small>
              </div>
            ) : (
              <div className="d-flex align-items-center text-secondary">
                <div className="badge text-secondary fs-5">
                  <i className="bi bi-view-list"></i>
                </div>
                <small>List</small>
              </div>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

SwitchGridListBtn.propTypes = {
  gridShow: PropTypes.bool.isRequired,
  setGridShow: PropTypes.func.isRequired,
};

export default SwitchGridListBtn;
