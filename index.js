const app = require("express")();
const { playerTypeTable } = require("./api/runescape");

const { rsMapping } = require("./utils");
let cors = require("cors");

app.use(cors());

PORT = process.env.PORT || 3001;

function parseRSData(dataString) {
  let newData = dataString.split("\n");
  let sanitizedData = [];
  newData.forEach((line, index) => {
    let lineData = line.split(",");

    if (rsMapping[index]) {
      sanitizedData[index] = {
        name: rsMapping[index],
        rank: lineData[0],
        level: lineData[1],
        experience: lineData[2] || -1,
      };
    }
  });
  console.log(sanitizedData);

  return sanitizedData;
}

async function getHighScores(playerType, playerName) {
  let result = await playerTypeTable[playerType].get("", {
    params: {
      player: playerName,
    },
  });

  let scoresData = parseRSData(result.data);
  return scoresData;
}

app.get("/regularHS/:playerToSearch", async function (req, res) {
  try {
    let result = await runescape.get("", {
      params: {
        player: req.params.playerToSearch,
      },
    });

    let dataObj = parseRSData(result.data);
    res.send(dataObj);
  } catch (e) {
    res.status(404).send({ error: e });
  }
});

app.get("/:playerType/:playerName", async (req, res) => {
  try {
    let dataObj = await getHighScores(
      req.params.playerType,
      req.params.playerName
    );
    res.send(dataObj);
  } catch (e) {
    res.status(404).send({ error: e });
  }
});

app.get("/online", (req, res) => {
  //   axios.get(
  //     "https://secure.runescape.com/m=website-data/playerDetails.ws?names=%5B%22jhelm%22%5D",
  //     {
  //       headers: {
  //         "Content-Type": "application/javascript",
  //         dataType: "jsonp",
  //       },
  //     }
  //   );
});

app.listen(PORT, () => {
  console.log("App listening on PORT: " + PORT);
});
