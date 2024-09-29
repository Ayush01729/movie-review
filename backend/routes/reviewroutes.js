const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewcontroller");
const pool = require("../models/db");

// Review Routes
router.get("/:id/reviews", reviewController.getReviewsForMovie);
router.post("/", reviewController.createReview);
router.get("/search", reviewController.searchReviews);
router.delete("/:movie_id/reviews/:review_id", reviewController.deleteReview);
router.put("/:movie_id/reviews/:review_id", reviewController.editReview);
router.get("/searchreviews/:term", reviewController.searchReviews2);

module.exports = router;
