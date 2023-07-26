const { rawgDebugger } = require("../startups/debugger");
// const rawgApi = require("../rawgServices/rawg-api-client");
const sendResponse = require("../startups/utils");
const { GenresModel } = require("../mongoose-models/genresModel");

// const getAllGenres = async (req, res) => {
//   try {
//     // const page = req.query.page || 1;
//     // const pageSize = req.query.pageSize || 10;

//     const {
//       data: { count, results },
//     } = await rawgApi.get(
//       "/genres"
//       // {
//       //   params: {
//       //     page: page,
//       //     page_size: pageSize,
//       //   },
//       // }
//     );
//     rawgDebugger(count);

//     const genresPool = results.map((genre) => {
//       return {
//         id: genre.id,
//         name: genre.name,
//         games_count: genre.games_count,
//         image_background: genre.image_background,
//       };
//     });

//     return sendResponse(
//       res,
//       200,
//       genresPool.sort((a, b) => b.games_count - a.games_count),
//       null
//     );
//   } catch (error) {
//     rawgDebugger(error);
//     return sendResponse(res, 500, null, error.message);
//   }
// };

// const getGenreById = async (req, res) => {
//   try {
//     const genreId = req.params.id;
//     const {
//       data: { id, name, games_count, image_background, description },
//     } = await rawgApi.get(
//       `/genres/${genreId}`
//       // {
//       //   params: {
//       //     page: page,
//       //     page_size: pageSize,
//       //   },
//       // }
//     );

//     return sendResponse(
//       res,
//       200,
//       { id, name, games_count, image_background, description },
//       null
//     );
//   } catch (error) {
//     rawgDebugger(error);
//     return sendResponse(res, 500, null, error.message);
//   }
// };

// const updateGenres = async (req, res) => {
//   const updatedGenres = req.body;
//   try {
//     await GenresModel.insertMany(updatedGenres, { ordered: false });
//     return sendResponse(res, 200, null, "Genres updated successfully!");
//   } catch (err) {
//     return sendResponse(res, 400, null, err.message);
//   }
// };

const getAllGenres = async (req, res) => {
  try {
    const genres = await GenresModel.find().sort("name");
    return sendResponse(res, 200, genres, null);
  } catch (error) {
    rawgDebugger(error);
    return sendResponse(res, 500, null, error.message);
  }
};

module.exports = { getAllGenres };
