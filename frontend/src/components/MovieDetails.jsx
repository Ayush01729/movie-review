// src/components/MovieDetails.js
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchMovieById, fetchReviewsByMovieId, deleteReview } from "../api";
import Navbar from "./Navbar";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const handleEditClick = (movieId, reviewId) => {
    debugger;
    navigate(`/edit-review/${reviewId}/${movieId}`);
  };

  const handleAddReviewClick = () => {
    navigate(`/add-review`);
  };
  const handleDeleteClick = async (movieId, reviewId) => {
    debugger;
    await deleteReview(movieId, reviewId);
    setReviews(reviews.filter((review) => review.id !== reviewId));
  };

  useEffect(() => {
    const getMovieDetails = async () => {
      debugger;
      const fetchedMovie = await fetchMovieById(id);
      console.log(fetchedMovie);
      setMovie(fetchedMovie);
    };
    const getReviews = async () => {
      const fetchedReviews = await fetchReviewsByMovieId(id);
      setReviews(fetchedReviews);
    };
    getMovieDetails();
    getReviews();
  }, [id]);

  return (
    <div className="container mx-auto">
      <Navbar />
      <div className="flex justify-between items-center mb-4 ml-4 mt-6">
        <h2 className="text-3xl font-bold">{movie.name}</h2>
        <p className="text-blue-900 font-bold mr-4 text-2xl">
          {movie.average_rating || "N/A"} /10
        </p>
      </div>

      {/* <div className="mb-8">
        <Link
          to={`/edit-movie/${movie.id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Edit Movie
        </Link>
      </div> */}

      {/* <h3 className="text-2xl font-semibold mb-4 ml-4">Reviews</h3> */}
      <div className="space-y-4 ml-4 mr-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white shadow-md rounded-lg p-4 ">
            <p className="text-gray-700">{review.comments}</p>
            <div className="flex justify-between items-center mt-2">
              <em>
                <span className="text-gray-600">By {review.reviewer_name}</span>
              </em>
              <span className="text-blue-600">{review.rating}/10</span>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => handleEditClick(movie.id, review.id)}
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                className="text-gray-500 hover:text-red-700"
                onClick={() => handleDeleteClick(movie.id, review.id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetails;
