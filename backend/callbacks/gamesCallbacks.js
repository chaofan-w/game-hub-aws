const { rawgDebugger } = require("../startups/debugger");
const rawgApi = require("../rawgServices/rawg-api-client");
const sendResponse = require("../startups/utils");
const { UsersModel } = require("../mongoose-models/usersModel");
const { GamesModel } = require("../mongoose-models/gamesModel");

// rawg api server connection issue, have to download part of data and import to MongoDB for the demo site building.
// const importToMongo = async (req, res) => {
//   try {
//     const page = req.query.page || 1;

//     const params = {
//       page: parseInt(page),
//       page_size: 100,
//     };

//     const {
//       data: { count, results },
//     } = await rawgApi.get("/games", {
//       params,
//     });

//     if (results.length === 0)
//       return sendResponse(res, 404, null, "No games found");

//     const gamesPool = results.map((game) => {
//       return {
//         id: game.id,
//         name: game.name,
//         released: game.released || new Date(),
//         background_image:
//           game.background_image ||
//           "https://media.rawg.io/media/games/c80/c80bcf321da44d69b18a06c04d942662.jpg",
//         rating: game.rating,
//         ratings_count: game.ratings_count,
//         platforms: game.platforms.map((platform) => platform.platform.name),
//       };
//     });

//     GamesModel.insertMany(gamesPool)
//       .then((docs) => {
//         rawgDebugger(docs);
//         return sendResponse(res, 200, docs, null);
//       })
//       .catch((err) => {
//         rawgDebugger(err);
//         return sendResponse(res, 500, null, err.message);
//       });
//   } catch (error) {
//     rawgDebugger(error);
//     return sendResponse(res, 500, null, error.message);
//   }
// };

const getAllGames = async (req, res) => {
  try {
    const filter = req.query.filter || null;
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;
    const limit = pageSize;

    const skip = (page - 1) * pageSize;

    const results = filter
      ? await GamesModel.find({ genres: filter }).skip(skip).limit(limit)
      : await GamesModel.find().skip(skip).limit(limit);

    const gamesPool = results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        released: game.released,
        background_image:
          game.background_image ||
          "https://media.rawg.io/media/games/c80/c80bcf321da44d69b18a06c04d942662.jpg",
        rating: game.rating,
        ratings_count: game.ratings_count,
        platforms: game.platforms,
        genres: game.genres,
      };
    });

    return sendResponse(res, 200, gamesPool, null);
  } catch (error) {
    return sendResponse(res, 404, null, error.message);
  }
};

// get games through rawg.io api, but server connection unstable
// const getAllGames = async (req, res) => {
//   try {
//     const filter = req.query.filter || null;
//     const page = req.query.page || 1;
//     const pageSize = req.query.pageSize || 10;

//     const params = {
//       page: parseInt(page),
//       page_size: parseInt(pageSize),
//       // ordering: "-metacritic",
//     };

//     if (filter) {
//       params.genres = filter;
//     }

//     console.log(params);

//     const {
//       data: { count, results },
//     } = await rawgApi.get("/games", {
//       params,
//     });
//     rawgDebugger(count);

//     const gamesPool = results.map((game) => {
//       return {
//         id: game.id,
//         name: game.name,
//         released: game.released,
//         background_image:
//           game.background_image ||
//           "https://media.rawg.io/media/games/c80/c80bcf321da44d69b18a06c04d942662.jpg",
//         rating: game.rating,
//         ratings_count: game.ratings_count,
//         platforms: game.platforms.map((platform) => platform.platform.name),
//       };
//     });

//     const ids = gamesPool.map((game) => game.id).join(",");
//     rawgDebugger(ids);

//     return sendResponse(res, 200, gamesPool, null);
//   } catch (error) {
//     return sendResponse(res, 404, null, error.message);
//   }
// };

const getGameById = async (req, res) => {
  try {
    const gameId = req.params.id;
    const {
      data: {
        id,
        name,
        description,
        metacritic,
        released,
        background_image,
        website,
        playtime,
        rating,
        ratings_count,
        platforms,
      },
    } = await rawgApi.get(`/games/${gameId}`);
    rawgDebugger(id);

    const game = {
      id,
      name,
      description,
      metacritic,
      released,
      background_image,
      website,
      playtime,
      rating,
      ratings_count,
      platforms: platforms.map((platform) => platform.platform.name),
    };

    return sendResponse(res, 200, game, null);
  } catch (error) {
    rawgDebugger(error);
    return sendResponse(res, 500, null, error.message);
  }
};

const getGamesByFilter = async (req, res) => {
  const { filter, value } = req.params;
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;
  try {
    const {
      data: { count, results },
    } = await rawgApi.get(`/games`, {
      params: {
        page: page,
        page_size: pageSize,
        [filter]: value,
        ordering: "-rating",
      },
    });

    if (results.length === 0)
      return sendResponse(res, 404, null, "No games found");

    const gamesPool = results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        released: game.released,
        background_image: game.background_image,
        rating: game.rating,
        ratings_count: game.ratings_count,
        platforms: game.platforms.map((platform) => platform.platform.name),
      };
    });

    rawgDebugger(count + "games found");
    return sendResponse(res, 200, gamesPool, null);
  } catch (error) {
    rawgDebugger(error);
    return sendResponse(res, 500, null, error.message);
  }
};

getGamesByArrayOfIds = async (req, res) => {
  const ids = req.params.ids;
  rawgDebugger(ids);
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;
  try {
    const {
      data: { count, results },
    } = await rawgApi.get(`/games?ids=${ids}`, {
      params: {
        page: page,
        page_size: pageSize,
        ordering: "-rating",
      },
    });

    if (count < ids.split(",").length)
      return sendResponse(res, 404, null, "some games not found");

    const gamesPool = results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        released: game.released,
        background_image: game.background_image,
        rating: game.rating,
        ratings_count: game.ratings_count,
        platforms: game.platforms.map((platform) => platform.platform.name),
      };
    });

    rawgDebugger(count + " games found");
    return sendResponse(res, 200, gamesPool, null);
  } catch (error) {
    rawgDebugger(error);
    return sendResponse(res, 500, null, error.message);
  }
};

getUserGameLibrary = async (req, res) => {
  const userId = req.user._id;
  const user = await UsersModel.findById(userId).select("-password -__v");
  if (user.gameLibrary.length === 0)
    return sendResponse(res, 404, null, "No games stored in your library");

  const ids = user.gameLibrary.join(",");
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;
  try {
    const {
      data: { count, results },
    } = await rawgApi.get(`/games?ids=${ids}`, {
      params: {
        page: page,
        page_size: pageSize,
        ordering: "-rating",
      },
    });

    if (count < ids.split(",").length)
      return sendResponse(res, 404, null, "some games not found");

    const gamesPool = results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        released: game.released,
        background_image: game.background_image,
        rating: game.rating,
        ratings_count: game.ratings_count,
        platforms: game.platforms.map((platform) => platform.platform.name),
      };
    });

    rawgDebugger(count + " games found");
    return sendResponse(res, 200, gamesPool, null);
  } catch (error) {
    rawgDebugger(error);
    return sendResponse(res, 500, null, error.message);
  }
};

getSuggestedGames = async (req, res) => {
  const keyword = req.params.keyword;
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;
  const limit = pageSize;
  const skip = (page - 1) * pageSize;
  try {
    const regex = new RegExp(keyword, "i");
    const suggestions = await GamesModel.find({ name: { $regex: regex } })
      .skip(skip)
      .limit(limit);
    return sendResponse(res, 200, suggestions, null);
  } catch (error) {
    rawgDebugger(error);
    return sendResponse(res, 500, null, error.message);
  }
};

module.exports = {
  getAllGames,
  getGameById,
  getGamesByFilter,
  getGamesByArrayOfIds,
  getUserGameLibrary,
  getSuggestedGames,
  // importToMongo,
};
