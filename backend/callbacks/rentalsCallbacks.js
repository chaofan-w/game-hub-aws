const { UsersModel } = require("../mongoose-models/usersModel");
const sendResponse = require("../startups/utils");
const { dbDebugger } = require("../startups/debugger");

const getAllOpenRentals = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await UsersModel.findById(userId).select("-password -__v");
    if (!user) return sendResponse(res, 404, null, "User not found");
    if (user.openRentals.length === 0)
      return sendResponse(res, 404, null, "No open rentals found");
    const openRentals = await user.openRentals;
    return sendResponse(res, 200, openRentals, null);
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
};

const addRentals = async (req, res) => {
  const userId = req.user._id;
  const { gamesInCart } = req.body;

  const gameIds =
    gamesInCart?.length > 0 ? gamesInCart.map((game) => game.id) : [];
  try {
    const user = await UsersModel.findById(userId).select("-password -__v");
    if (!user) return sendResponse(res, 404, null, "User not found");

    const openRentals = await user.openRentals;
    const allOpenRentalsIds = openRentals.map((rental) => rental.id);

    const duplicatedIds = gameIds?.filter((id) =>
      allOpenRentalsIds.includes(id)
    );
    if (duplicatedIds.length > 0)
      return sendResponse(
        res,
        400,
        null,
        `${duplicatedIds.join(",")} already in your open rentals`
      );

    dbDebugger("gamesInCart", gamesInCart);

    gamesInCart?.forEach(async (game) => {
      dbDebugger("game", game);
      await openRentals.push(game);
    });
    await user.save();
    return sendResponse(
      res,
      200,
      null,
      `game with ids:${gameIds.join(",")} added successfully`
    );
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
};

const deleteRentals = async (req, res) => {
  const userId = req.user._id;
  const { gamesToDelete } = req.body;
  dbDebugger("gamesToDelete", gamesToDelete);
  dbDebugger("userId", userId);
  try {
    const user = await UsersModel.findById(userId).select("-password -__v");
    if (!user) return sendResponse(res, 404, null, "User not found");
    if (user.openRentals.length === 0)
      return sendResponse(res, 404, null, "No open rentals found");
    if (gamesToDelete.length === 0)
      return sendResponse(res, 404, null, "No game ids provided");
    const gameIds =
      gamesToDelete?.length > 0 ? gamesToDelete.map((game) => game.id) : [];
    const allOpenRentalsIds = user.openRentals.map((rental) => rental.id);
    const notFoundIds = gameIds.filter((id) => !allOpenRentalsIds.includes(id));
    if (notFoundIds.length > 0)
      return sendResponse(
        res,
        404,
        null,
        `${notFoundIds.join(",")} not found in your open rentals`
      );

    gamesToDelete?.length > 0 &&
      gamesToDelete.forEach(async (game) => {
        const rentalToClose = user.openRentals.find(
          (rental) => rental.id == game.id
        );

        const rentalInClosedRentals = user.closedRentals.find(
          (rental) => rental.id == game.id
        );
        if (rentalInClosedRentals) {
          rentalInClosedRentals.rentalRecords.push({
            rentalStartDate: rentalToClose.rentalStartDate,
            rentalEndDate: Date.now(),
          });
        } else {
          await user.closedRentals.push({
            ...game,
            rentalRecords: [
              {
                rentalStartDate: rentalToClose.rentalStartDate,
                rentalEndDate: Date.now(),
              },
            ],
          });
        }
        await user.openRentals.pull(rentalToClose._id);
      });
    await user.save();
    return sendResponse(
      res,
      200,
      null,
      `game with ids:${gameIds.join(",")} returned successfully`
    );
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
};

const automaticCloseRentals = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await UsersModel.findById(userId).select("-password -__v");
    if (!user) return sendResponse(res, 404, null, "User not found");

    if (user.openRentals.length === 0)
      return sendResponse(res, 404, null, "No open rentals found");

    const allOverdueRentals = user.openRentals.filter((rental) => {
      return rental.rentalEndDate <= Date.now();
    });

    if (allOverdueRentals.length === 0)
      return sendResponse(res, 404, null, "No overdue rentals found");

    // allOverdueRentals.forEach(async (rental) => {
    //   const rentalInClosedRentals = user.closedRentals.find(
    //     (item) => item._id === rental._id
    //   );

    //   if (rentalInClosedRentals) {
    //     rentalInClosedRentals.rentalRecords.push({
    //       rentalStartDate: rental.rentalStartDate,
    //       rentalEndDate: rental.rentalEndDate,
    //     });
    //   } else {
    //     await user.closedRentals.push({
    //       _id: rental._id,
    //       rentalRecords: [
    //         {
    //           rentalStartDate: rental.rentalStartDate,
    //           rentalEndDate: rental.rentalEndDate,
    //         },
    //       ],
    //     });
    //   }
    //   await user.openRentals.pull(rental._id);
    // });

    allOverdueRentals.forEach(async (game) => {
      const rentalToClose = user.openRentals.find(
        (rental) => rental.id == game.id
      );

      dbDebugger("rentalToClose", rentalToClose);
      dbDebugger("game", game);

      const rentalInClosedRentals = user.closedRentals.find(
        (rental) => rental.id == game.id
      );
      if (rentalInClosedRentals) {
        rentalInClosedRentals.rentalRecords.push({
          rentalStartDate: rentalToClose.rentalStartDate,
          rentalEndDate: Date.now(),
        });
      } else {
        await user.closedRentals.push({
          id: game.id,
          name: game.name,
          background_image: game.background_image,
          rentalRecords: [
            {
              rentalStartDate: rentalToClose.rentalStartDate,
              rentalEndDate: Date.now(),
            },
          ],
        });
      }
      await user.openRentals.pull(rentalToClose._id);
    });

    await user.save();
    return sendResponse(
      res,
      200,
      null,
      `All overdue rentals: ${allOverdueRentals
        .map((rental) => rental._id)
        .join(", ")} closed successfully`
    );
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
};

const getAllClosedRentals = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await UsersModel.findById(userId).select("-password -__v");
    if (!user) return sendResponse(res, 404, null, "User not found");
    const closedRentals = await user.closedRentals;
    if (closedRentals.length === 0)
      return sendResponse(res, 404, null, "No closed rentals found");

    return sendResponse(res, 200, closedRentals, null);
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
};

module.exports = {
  getAllOpenRentals,
  addRentals,
  deleteRentals,
  automaticCloseRentals,
  getAllClosedRentals,
};
