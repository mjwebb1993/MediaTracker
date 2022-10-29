const { Router } = require("express");
const router = Router();
const Book = require("../models/Book");

//  Create a new order with customer, Book, delivery and notes documents
router.post("/", (request, response) => {
  const newBook = new Book(request.body);
  newBook.save((error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

router.get("/", (request, response) => {
  Book.find({}, (error, record) => {
    if (error) return response.status(500).json(error);
    return response.json(record);
  });
});

router.get("/:id", (request, response) => {
  Book.findById(request.params.id, (error, record) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(record);
  });
});

router.put("/:id", (request, response) => {
  const body = request.body;
  Book.findByIdAndUpdate(
    request.params.id,
    {
      $set: {
        name: body.name,
        yearReleased: body.yearReleased,
        genre: body.genre,
        author: body.author,
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
  Book.findByIdAndRemove(request.params.id, {}, (error, record) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(record);
  });
});

module.exports = router;
