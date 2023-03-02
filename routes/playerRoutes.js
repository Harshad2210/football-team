const express = require("express");
const {
  addPlayer,
  getAllPlayers,
  getPlayer,
  updatePlayer,
  deletePlayer
} = require("../controllers/playerController");

const router = express.Router();

// http://localhost:3000/api/players
router.post("/players", addPlayer);

// http://localhost:3000/api/players
router.get("/players", getAllPlayers);

// http://localhost:3000/api/players/xxxx_player_id
router.get("/players/:id", getPlayer);

// http://localhost:3000/api/players/xxxx_player_id
router.put("/players/:id", updatePlayer);

// http://localhost:3000/api/players/xxxx_player_id
router.delete("/players/:id", deletePlayer);

module.exports = {
  routes: router
};
