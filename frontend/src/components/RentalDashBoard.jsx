import { useSelector } from "react-redux";
import { selectUserState } from "../features/users/usersSlice";
import ActivatedGameCard from "./ActivatedGameCard";

const RentalDashBoard = () => {
  const { user } = useSelector(selectUserState);

  return (
    <div
      className="container-fluid py-3 px-2 px-md-5"
      style={{ minHeight: "84vh" }}
    >
      <h3 className="text-start display-5">My Activated Games</h3>
      <h5 className="text-start">
        <span>Activated: </span>
        <span className="text-secondary fs-2 fst-italic ">
          {`${
            (user?.data?.openRentals?.length > 0 &&
              user.data.openRentals.length) ||
            0
          }`}
        </span>
        <span> / 15</span>
      </h5>
      {/* <div className="row row-cols-1 px-0"> */}
      {user?.data?.openRentals?.length > 0 ? (
        user.data.openRentals.map((game, index) => (
          <div
            className="p-0 g-3 d-flex align-items-stratch justify-content-center px-0"
            key={index}
          >
            <ActivatedGameCard game={game} />
          </div>
        ))
      ) : (
        <h5 className="text-center">No games activated</h5>
      )}
      {/* </div> */}
    </div>
  );
};

export default RentalDashBoard;
