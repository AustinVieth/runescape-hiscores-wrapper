const { default: axios } = require("axios");

const runescapeIron = axios.create({
  baseURL: `https://secure.runescape.com/m=hiscore_ironman/index_lite.ws/index_lite.ws`,
  dataType: "jsonp",
});

module.exports = {
  runescapeIron,
};
