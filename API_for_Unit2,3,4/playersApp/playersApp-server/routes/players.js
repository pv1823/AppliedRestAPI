var express = require('express');
var mongo = require('mongodb');
var router = express.Router();

//MongoURL
const url = 'mongodb://localhost:27017';

router.get('/', async (req, res) => {
  try {
    const dbConnect = await mongo.MongoClient.connect(url);
    const playersDb = dbConnect.db('playersDb');
    const players = playersDb.collection('players');
    const playersList = await players.find().toArray();
    res.json(playersList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.options('/', function (req, res) {});

router.post('/', async (req, res) => {
  const dbConnect = await mongo.MongoClient.connect(url);
  const playersDb = dbConnect.db('playersDb');
  const players = playersDb.collection('players');

  const newPlayerInfo = req.body;
  newPlayerInfo.name = req.body.name;

  console.log(newPlayerInfo.name);

  const newPlayer = await players.insertOne(newPlayerInfo);

  res.send(newPlayer);
});

router.patch('/:name', async (req, res) => {
  const playerName = req.params.name;
  const updatedPlayerInfo = req.body;

  const dbConnect = await mongo.MongoClient.connect(url);
  const playersDb = dbConnect.db('playersDb');
  const players = playersDb.collection('players');

  const updatedPlayer = await players.findOneAndUpdate(
    { name: playerName },
    { $set: updatedPlayerInfo },
    { returnOriginal: false }
  );

  // Checking if the Patch is done.
  if (!updatedPlayer) {
    return res.status(404).json({ message: 'Player not found and not updated' });
  }

  res.json(updatedPlayer);
});

router.delete('/:name', async (req, res) => {
  let playerName = req.params.name;

  const dbConnect = await mongo.MongoClient.connect(url);
  const playersDb = dbConnect.db('playersDb');
  const players = playersDb.collection('players');

  const deletePlayer = players.deleteOne({ name: playerName });

  if (!deletePlayer) {
    return res.status(404).json({ message: 'Player not found' });
  }

  res.json({ message: 'Player deleted successfully.' });
});

router.get('/export', async (req, res, next) => {
  const dbConnect = await mongo.MongoClient.connect(url);
  const playersDb = dbConnect.db('playersDb');
  const players = playersDb.collection('players');
  let PlayerList = await players.find().toArray();

  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify(PlayerList));
});

module.exports = router;
