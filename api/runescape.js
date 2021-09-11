const { default: axios } = require("axios");

const runescape = axios.create({
  baseURL: `https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws`,
  dataType: "jsonp",
});

const runescapeIron = axios.create({
  baseURL: `https://secure.runescape.com/m=hiscore_ironman/index_lite.ws/index_lite.ws`,
  dataType: "jsonp",
});

const runescapeHardcore = axios.create({
  baseURL: `https://secure.runescape.com/m=hiscore_hardcore_ironman/index_lite.ws/index_lite.ws`,
  dataType: "jsonp",
});

let playerTypeTable = {
  regular: runescape,
  ironman: runescapeIron,
  hardcore: runescapeHardcore,
};

module.exports = {
  runescape,
  runescapeIron,
  runescapeHardcore,
  playerTypeTable,
};
