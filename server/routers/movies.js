const { Router } = require("express");
const Movie = require("../models/Movie");
const router = Router();

//  Create a new order with customer, Movie, delivery and notes documents
router.post("/", (request, response) => {
  const newMovie = new Movie(request.body);
  newMovie.save((error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

router.get("/", (request, response) => {
  Movie.find({}, (error, record) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(record);
  });
});

router.get("/:id", (request, response) => {
  Movie.findById(request.params.id, (error, record) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(record);
  });
});

router.put("/:id", (request, response) => {
  const body = request.body;
  Movie.findByIdAndUpdate(
    request.params.id,
    {
      $set: {
        name: body.name,
        yearReleased: body.yearReleased,
        genre: body.genre,
        distributor: body.distributor,
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
  Movie.findByIdAndRemove(request.params.id, {}, (error, record) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(record);
  });
});

module.exports = router;
