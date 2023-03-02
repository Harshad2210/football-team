const firebase = require("../db");
const Player = require("../models/player");
const fireStore = firebase.firestore();

// performing crud operations in the firebase firestore add , get all, get, 
// update and delete

const addPlayer = async (req, res, next) => {
  try {
    console.log("Adding new Player");
    const data = req.body;
    await fireStore.collection("players").doc().set(data);
    res.status(201).json({ message: "Record saved successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllPlayers = async (req, res, next) => {
  try {
    console.log("Getting all Players");
    const players_collection = await fireStore.collection("players");
    const data = await players_collection.get();
    const players_arr = [];
    if (data.empty) {
      res.status(200).json({ message: "No records found" });
    } else {
      let total = 0;
      data.forEach((item) => {
        const player = new Player(
          item.id,
          item.data().fullName,
          item.data().age,
          item.data().contact,
          item.data().position
        );
        players_arr.push(player);
        total = total + 1;
      });
      res.status(200).json({
        listing: players_arr,
        count: total
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPlayer = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("Getting Player= %s", id);
    const selected_player = await fireStore.collection("players").doc(id);
    const data = await selected_player.get();
    if (!data.exists) {
      res.status(404).json({ message: "Record not found" });
    } else {
      res.status(200).json(data.data());
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePlayer = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("Updating Player= %s", id);
    const data = req.body;
    const selected_player = await fireStore.collection("players").doc(id);
    await selected_player.update(data);
    res.status(204).json({ message: "Record updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePlayer = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("Deleting Player= %s", id);
    await fireStore.collection("players").doc(id).delete();
    res.status(204).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {
  addPlayer,
  getAllPlayers,
  getPlayer,
  updatePlayer,
  deletePlayer
};
