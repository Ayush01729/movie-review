const pool = require("../models/db");

// Fetch all reviews for a specific movie
exports.getReviewsForMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM reviews WHERE movie_id = $1",
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Create a new review
exports.createReview = async (req, res) => {
  const { movie_id, reviewer_name, rating, comments } = req.body;

  try {
    // Insert the new review into the database
    const newReview = await pool.query(
      "INSERT INTO reviews (movie_id, reviewer_name, rating, comments) VALUES ($1, $2, $3, $4) RETURNING *",
      [movie_id, reviewer_name, rating, comments]
    );

    // Recalculate average rating for the movie
    const movieReviews = await pool.query(
      "SELECT AVG(rating) as avg_rating FROM reviews WHERE movie_id = $1",
      [movie_id]
    );

    const averageRating = movieReviews.rows[0].avg_rating;

    // Update the movie with the new average rating
    await pool.query("UPDATE movies SET average_rating = $1 WHERE id = $2", [
      averageRating,
      movie_id,
    ]);

    // Send the newly added review as the response
    res.json(newReview.rows[0]);
  } catch (err) {
    console.error(
      "Error while adding review and updating average rating:",
      err.message
    );
    res.status(500).send("Server Error");
  }
};

// Search reviews by reviewer name, comments, or movie name
exports.searchReviews = async (req, res) => {
  const { searchTerm } = req.query; // Get the search term from the query parameter

  if (!searchTerm) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    // Use ILIKE for case-insensitive search with % wildcards for partial match
    const searchPattern = `%${searchTerm}%`;

    const reviews = await pool.query(
      `SELECT reviews.*, movies.name AS movie_name 
       FROM reviews 
       JOIN movies ON reviews.movie_id = movies.id
       WHERE reviews.reviewer_name ILIKE $1
       OR reviews.comments ILIKE $1
       OR movies.name ILIKE $1`,
      [searchPattern]
    );

    res.json(reviews.rows);
  } catch (err) {
    console.error("Error searching reviews:", err.message);
    res.status(500).send("Server Error");
  }
};

//Delete a review
exports.deleteReview = async (req, res) => {
  const { movie_id, review_id } = req.params;

  try {
    // Delete the review from the database
    await pool.query("DELETE FROM reviews WHERE id = $1", [review_id]);

    // Recalculate average rating for the movie
    const movieReviews = await pool.query(
      "SELECT AVG(rating) as avg_rating FROM reviews WHERE movie_id = $1",
      [movie_id]
    );

    const averageRating = movieReviews.rows[0].avg_rating;

    // Update the movie with the new average rating
    await pool.query("UPDATE movies SET average_rating = $1 WHERE id = $2", [
      averageRating,
      movie_id,
    ]);

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error(
      "Error while deleting review and updating average rating:",
      err.message
    );
    res.status(500).send("Server Error");
  }
};

//Edit a review
exports.editReview = async (req, res) => {
  const { movie_id, review_id } = req.params;
  const { reviewer_name, rating, comments } = req.body;

  try {
    // Update the review in the database
    const updatedReview = await pool.query(
      "UPDATE reviews SET reviewer_name = $1, rating = $2, comments = $3 WHERE id = $4 RETURNING *",
      [reviewer_name, rating, comments, review_id]
    );

    // Recalculate average rating for the movie
    const movieReviews = await pool.query(
      "SELECT AVG(rating) as avg_rating FROM reviews WHERE movie_id = $1",
      [movie_id]
    );

    const averageRating = movieReviews.rows[0].avg_rating;

    // Update the movie with the new average rating
    await pool.query("UPDATE movies SET average_rating = $1 WHERE id = $2", [
      averageRating,
      movie_id,
    ]);

    res.json(updatedReview.rows[0]);
  } catch (err) {
    console.error(
      "Error while updating review and average rating:",
      err.message
    );
    res.status(500).send("Server Error");
  }
};

exports.searchReviews2 = async (req, res) => {
  const { term } = req.query; // Get search term from the query string

  try {
    const query = `
      SELECT * FROM reviews 
      WHERE comments ILIKE $1 OR reviewer_name ILIKE $1;
    `; // Search reviews by partial match using ILIKE (case-insensitive)

    await pool.query(
      "SELECT * FROM reviews WHERE comments ILIKE $1 OR reviewer_name ILIKE $1",
      [term]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error searching reviews:", error.message);
    res.status(500).json({ error: "Server error while searching reviews" });
  }
};
