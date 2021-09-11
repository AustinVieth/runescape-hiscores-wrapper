const { default: axios } = require("axios");

const runescapeHardcore = axios.create({
  baseURL: `https://secure.runescape.com/m=hiscore_hardcore_ironman/index_lite.ws/index_lite.ws`,
  dataType: "jsonp",
});

module.exports = {
  runescapeHardcore,
};
