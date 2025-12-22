const {resolve} = require("node:path");
require("dotenv").config({
    path: resolve(__dirname, "../../.env")
});

module.exports = {
    COUNTRYLAYER_API: process.env.COUNTRYLAYER_API,
    EXCANHGERATE_API: process.env.EXCANHGERATE_API
};
