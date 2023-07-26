import { useSelector } from "react-redux";
import { selectUserState } from "../features/users/usersSlice";
import PropTypes from "prop-types";
import { convertDateFormat } from "../utils";
import ReturnRentalBtn from "./ReturnRentalBtn";

// eslint-disable-next-line no-unused-vars
const Profile = ({ colorMode }) => {
  const { user } = useSelector(selectUserState);

  return (
    // user profile page
    <div className="container-fluid">
      {user && user.data ? (
        <div className="card">
          <div className="card-title">
            <h1 className="text-center">{`Hello! ${user.data.username}`}</h1>
          </div>
          <div className="card-body">
            <div className="list-group">
              <div className="list-group-item">
                <span>firstname</span>
                <h3 className="text-center">{user.data.firstName}</h3>
              </div>
              <div className="list-group-item">
                <span>lastname</span>
                <h3 className="text-center">{user.data.lastName}</h3>
              </div>
              <div className="list-group-item">
                <span>Username</span>
                <h3 className="text-center">{user.data.username}</h3>
              </div>
              <div className="list-group-item">
                <span>Email</span>
                <h3 className="text-center">{user.data.email}</h3>
              </div>
              <div className="list-group-item">
                <div className="mb-2">My Library</div>
                <div className="row row-cols-3 border border-1">
                  {user &&
                    user.data &&
                    user.data.gameLibrary.length > 0 &&
                    user.data.gameLibrary.map((game, index) => (
                      <div
                        className="col border border-1 py-2 text-center"
                        key={index}
                      >
                        <span>{game.id}</span>
                      </div>
                    ))}
                </div>
              </div>
              <div className="list-group-item">
                <div className="mb-2">Open Retals</div>
                <div className="row row-cols-1 row-cols-md-3 border border-1">
                  {user &&
                    user.data &&
                    user.data.openRentals.length > 0 &&
                    user.data.openRentals.map((game, index) => (
                      <div
                        className="col border border-1 py-2 text-center"
                        key={index}
                      >
                        <div className="list-group">
                          <div className="list-group-item d-flex justify-content-start row row-cols-2">
                            <small className="text-start border border-1 col">
                              {"game id: "}
                            </small>
                            <small className="col text-start">{game.id}</small>
                          </div>
                          <div className="list-group-item d-flex justify-content-start row row-cols-2">
                            <small className="text-start border border-1 col">
                              {"game name: "}
                            </small>
                            <small className="col text-start">
                              {game.name}
                            </small>
                          </div>
                          <div className="list-group-item d-flex justify-content-start row row-cols-2">
                            <small className="text-start border border-1 col">
                              {"date rented: "}
                            </small>
                            <small className="col text-start">
                              {convertDateFormat(game.rentalStartDate)}
                            </small>
                          </div>
                          <div className="list-group-item d-flex justify-content-start row row-cols-2">
                            <small className="text-start border border-1 col">
                              {"date due: "}
                            </small>
                            <small className="col text-start">
                              {convertDateFormat(game.rentalEndDate)}
                            </small>
                          </div>
                          <div className="list-group-item d-flex justify-content-start row row-cols-1">
                            <div className="text-start border border-1 col">
                              <ReturnRentalBtn game={game} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="list-group-item">
                <div className="mb-2">Closed Rentals</div>
                <div className="row row-cols-1 border border-1">
                  {user &&
                    user.data &&
                    user.data.closedRentals.length > 0 &&
                    user.data.closedRentals.map((game, index) => (
                      <div
                        className="col border border-1 py-2 text-center"
                        key={index}
                      >
                        <div className="list-group">
                          <div className="list-group-item d-flex justify-content-start row row-cols-2 bg-primary">
                            <small className="text-start  col">
                              {"game id: "}
                            </small>
                            <small className="col text-start">{game.id}</small>
                          </div>
                          <div className="list-group-item d-flex justify-content-start row row-cols-2">
                            <small className="text-start  col">
                              {"game name: "}
                            </small>
                            <small className="col text-start">
                              {game.name}
                            </small>
                          </div>
                          <div className="list-group-item d-flex justify-content-start row row-cols-2">
                            {game.rentalRecords &&
                              game.rentalRecords.length > 0 &&
                              game.rentalRecords.map((record, index) => (
                                <div key={index} className="list-group">
                                  <div className="list-group-item d-flex justify-content-start row row-cols-2">
                                    <small className="text-start  col">
                                      {"rental id: "}
                                    </small>
                                    <small className="col text-start">
                                      {record._id}
                                    </small>
                                  </div>
                                  <div className="list-group-item d-flex justify-content-start row row-cols-2">
                                    <small className="text-start col">
                                      {"rental start date: "}
                                    </small>
                                    <small className="col text-start">
                                      {convertDateFormat(
                                        record.rentalStartDate
                                      )}
                                    </small>
                                  </div>
                                  <div className="list-group-item d-flex justify-content-start row row-cols-2">
                                    <small className="text-start col">
                                      {"rental end date: "}
                                    </small>
                                    <small className="col text-start">
                                      {convertDateFormat(record.rentalEndDate)}
                                    </small>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="list-group-item">
                <span>Date Join</span>
                <h3 className="text-center">
                  {convertDateFormat(user.data.createdDate)}
                  {/* {new Date(user.data.createdDate).toISOString().slice(0, 10)} */}
                </h3>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-title">
            <h1 className="text-center">Please Login</h1>
          </div>
        </div>
      )}
    </div>
  );
};

Profile.propTypes = {
  colorMode: PropTypes.string.isRequired,
};

export default Profile;
