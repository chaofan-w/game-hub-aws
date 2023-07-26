const { rawgDebugger } = require("../startups/debugger");
const rawgApi = require("../rawgServices/rawg-api-client");
const sendResponse = require("../startups/utils");

const getAllPlatforms = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;

    const {
      data: { count, results },
    } = await rawgApi.get("/platforms", {
      params: {
        page: page,
        page_size: pageSize,
        ordering: "-games_count",
      },
    });
    rawgDebugger(count);

    const platformsPool = results.map((platform) => {
      return {
        id: platform.id,
        name: platform.name,
        games_count: platform.games_count,
        image_background: platform.image_background,
      };
    });

    return sendResponse(res, 200, platformsPool, null);
  } catch (error) {
    rawgDebugger(error);
    return sendResponse(res, 500, null, error.message);
  }
};

const getPlatformById = async (req, res) => {
  try {
    const platformId = req.params.id;
    const {
      data: { id, name, games_count, image_background, description },
    } = await rawgApi.get(
      `/platforms/${platformId}`
      // {
      //   params: {
      //     page: page,
      //     page_size: pageSize,
      //   },
      // }
    );

    return sendResponse(
      res,
      200,
      { id, name, games_count, image_background, description },
      null
    );
  } catch (error) {
    rawgDebugger(error);
    return sendResponse(res, 500, null, error.message);
  }
};

module.exports = { getAllPlatforms, getPlatformById };
