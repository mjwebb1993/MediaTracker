const { Router } = require("express");
const Game = require("../models/Game");
const router = Router();

//  Create a new order with customer, Game, delivery and notes documents
router.post("/", (request, response) => {
  const newGame = new Game(request.body);
  newGame.save((error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

router.get("/", (request, response) => {
  Game.find({}, (error, record) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(record);
  });
});

router.get("/:id", (request, response) => {
  Game.findById(request.params.id, (error, record) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(record);
  });
});

router.put("/:id", (request, response) => {
  const body = request.body;
  Game.findByIdAndUpdate(
    request.params.id,
    {
      $set: {
        name: body.name,
        yearReleased: body.yearReleased,
        genre: body.genre,
        console: body.console,
        picUrl: body.picUrl
      }
    },
    {
      new: true,
      upsert: true
    },
    (error, record) => {
      if (error) return response.status(500).json(error);
      return response.json(record);
    }
  );
});

router.delete("/:id", (request, response) => {
  Game.findByIdAndRemove(request.params.id, {}, (error, record) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(record);
  });
});

module.exports = router;
