const { rawgDebugger } = require("../startups/debugger");
const rawgApi = require("../rawgServices/rawg-api-client");
const sendResponse = require("../startups/utils");

const getAllPublishers = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;

    const {
      data: { count, results },
    } = await rawgApi.get("/publishers", {
      params: {
        page: page,
        page_size: pageSize,
      },
    });
    rawgDebugger(count);

    const publishersPool = results.map((publisher) => {
      return {
        id: publisher.id,
        name: publisher.name,
        games_count: publisher.games_count,
        image_background: publisher.image_background,
      };
    });

    return sendResponse(res, 200, publishersPool, null);
  } catch (error) {
    rawgDebugger(error);
    return sendResponse(res, 500, null, error.message);
  }
};

module.exports = { getAllPublishers };
