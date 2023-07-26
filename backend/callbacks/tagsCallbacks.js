const { rawgDebugger } = require("../startups/debugger");
const rawgApi = require("../rawgServices/rawg-api-client");
const sendResponse = require("../startups/utils");

const getAllTags = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;

    const {
      data: { count, results },
    } = await rawgApi.get("/tags", {
      params: {
        page: page,
        page_size: pageSize,
      },
    });
    rawgDebugger(count);

    const tagsPool = results.map((tag) => {
      return {
        id: tag.id,
        name: tag.name,
        games_count: tag.games_count,
        image_background: tag.image_background,
      };
    });

    return sendResponse(res, 200, tagsPool, null);
  } catch (error) {
    rawgDebugger(error);
    return sendResponse(res, 500, null, error.message);
  }
};

module.exports = { getAllTags };
