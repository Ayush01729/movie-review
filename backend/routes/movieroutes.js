const express = require("express");
const router = express.Router();
const movieController = require("../controllers/moviecontroller");

// Movie Routes
router.get("/", movieController.getMovies);
router.get("/:id", movieController.getMovieById);
router.post("/", movieController.createMovie);
router.delete("/:id", movieController.deleteMovie);
router.get("/search", movieController.searchMovies);
router.put("/:id", movieController.editMovieById);

module.exports = router;
