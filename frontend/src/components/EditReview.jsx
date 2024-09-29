// src/components/EditReview.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editReview, fetchReviewsByMovieId } from "../api"; // Assuming fetchReview and editReview are in api.js

function EditReview() {
  debugger;
  const { movieId, reviewId } = useParams(); // Extract movieId and reviewId from the URL
  const navigate = useNavigate();

  // Set initial state for review data
  const [review, setReview] = useState({
    reviewer_name: "",
    rating: 0,
    comments: "",
  });

  // Fetch the review details using reviewId when component mounts
  useEffect(() => {
    const getReviewDetails = async () => {
      debugger;
      const fetchedReview = await fetchReviewsByMovieId(movieId); // API call to get review data
      setReview(fetchedReview); // Pre-fill the form with the fetched review data
    };
    getReviewDetails();
  }, [movieId, reviewId]);

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    await editReview(movieId, reviewId, review); // API call to edit the review
    navigate(`/movies/${movieId}`); // After saving, navigate back to the movie page
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">Edit Review</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Reviewer Name */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Reviewer Name
          </label>
          <input
            type="text"
            value={review.reviewer_name}
            onChange={(e) =>
              setReview({ ...review, reviewer_name: e.target.value })
            }
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Rating (0-10)
          </label>
          <input
            type="number"
            value={review.rating}
            onChange={(e) =>
              setReview({ ...review, rating: Number(e.target.value) })
            }
            min="0"
            max="10"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Comments */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Comments
          </label>
          <textarea
            value={review.comments}
            onChange={(e) => setReview({ ...review, comments: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
            onClick={handleSubmit}
          >
            Update Review
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditReview;
