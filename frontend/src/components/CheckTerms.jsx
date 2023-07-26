import PropTypes from "prop-types";

const CheckTerms = ({ checkTerms, setCheckTerms }) => {
  return (
    <div className="container-fluid mt-5 mb-3 px-0">
      <div className="form-check d-flex align-items-center justfiy-content-start">
        <input
          type="checkbox"
          value=""
          id="checkTerms"
          className="form-check me-3"
          onChange={() => {
            setCheckTerms(!checkTerms);
          }}
        />
        <label htmlFor="checkTerms" className="form-check-label fs-5">
          I agree to the{" "}
          <a
            href="#"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTerms"
            aria-expanded="false"
            aria-controls="collapseTerms"
            className="text-secondary"
          >
            Terms and Conditions
          </a>
        </label>
      </div>
      <div className="collapse w-50" id="collapseTerms">
        <div className="card card-body">
          <h5>Terms and Conditions</h5>
          <p>
            {
              'By subscribing to our Online Game Rental Services (the "Services"), you, the User, agree to adhere to these terms and conditions. You must be 18 years or older and capable of entering into a legally binding agreement. Our Services grant you a non-transferable, non-exclusive license to rent and play games from our library for a limited duration, contingent upon payment of applicable fees. Games must not be copied, sold, shared, or used outside the agreed terms. Any breaches of these terms will result in immediate termination of the Services, without refund. Please remember, the games remain the intellectual property of their respective owners at all times. We reserve the right to alter these terms and conditions or terminate the Services at our discretion.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

CheckTerms.propTypes = {
  checkTerms: PropTypes.bool.isRequired,
  setCheckTerms: PropTypes.func.isRequired,
};

export default CheckTerms;
