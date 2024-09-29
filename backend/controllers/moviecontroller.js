const pool = require("../models/db");

// Fetch all movies
exports.getMovies = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM movies");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

//Get movie by id
exports.getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM movies WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).send("Movie not found");
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Edit movie by id
exports.editMovieById = async (req, res) => {
  const { id } = req.params;
  const { name, release_date, average_rating } = req.body;
  try {
    const result = await pool.query(
      "UPDATE movies SET name = $1, release_date = $2, average_rating = $3 WHERE id = $4 RETURNING *",
      [name, release_date, average_rating, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Movie not found");
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Create a new movie
exports.createMovie = async (req, res) => {
  try {
    const { name, release_date } = req.body;
    const result = await pool.query(
      "INSERT INTO movies (name, release_date) VALUES ($1, $2) RETURNING *",
      [name, release_date]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Delete a movie and its reviews
exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM reviews WHERE movie_id = $1", [id]);
    await pool.query("DELETE FROM movies WHERE id = $1", [id]);
    res.send("Movie and its reviews deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.searchMovies = async (req, res) => {
  const searchTerm = req.query.q; // Get the search term from the query parameter

  if (!searchTerm) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    // Use ILIKE for case-insensitive search
    const movies = await pool.query(
      "SELECT * FROM movies WHERE name ILIKE $1",
      [`%${searchTerm}%`]
    );

    res.json(movies.rows);
  } catch (err) {
    console.error("Error searching movies:", err.message);
    res.status(500).send("Server Error");
  }
};
