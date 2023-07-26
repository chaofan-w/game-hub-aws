import PropTypes from "prop-types";
import ReturnRentalBtn from "./ReturnRentalBtn";
import { convertDateFormat } from "../utils";

const ActivatedGameCard = ({ game }) => {
  return (
    <div className="card mb-3" style={{ width: "100%", maxWidth: "720px" }}>
      <div className="row g-0 py-0 h-100 rounded-start-3">
        <div
          className="col-md-3 rounded-start-3"
          style={{
            backgroundImage: `url(${game.background_image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "180px",
          }}
        ></div>
        <div className="col-md-7">
          <div className="card-body py-3 d-flex h-100 flex-column justify-content-between">
            <h5 className="card-title text-secondary">{game.name}</h5>

            <div className="card-text d-flex flex-column">
              <small className="text-body-secondary">
                {"Order date: " + convertDateFormat(game.rentalStartDate)}
              </small>
              <small className="text-body-white">
                {"Return date: " + convertDateFormat(game.rentalEndDate)}
              </small>
            </div>
          </div>
        </div>
        <div className="col-md-2 d-flex align-items-center justify-content-center py-2">
          <ReturnRentalBtn game={game} />
        </div>
      </div>
    </div>
  );
};

ActivatedGameCard.propTypes = {
  game: PropTypes.object.isRequired,
};

export default ActivatedGameCard;
