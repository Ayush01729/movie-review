import React, { useState } from "react";
import { fetchReviewsBySearchTerm } from "../api"; // Assuming you have an API call for fetching reviews
import Navbar from "./Navbar";

function ReviewSearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSearch = async (e) => {
    debugger;
    e.preventDefault();
    const fetchedReviews = await fetchReviewsBySearchTerm(searchTerm);
    setReviews(fetchedReviews);
  };

  return (
    <div className="container mx-auto ">
      <Navbar />
      <h2 className="text-center text-2xl font-bold mb-8 mt-8">
        Search Reviews
      </h2>

      <form onSubmit={handleSearch} className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search reviews..."
          className="border rounded px-4 py-2 w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
        >
          Search
        </button>
      </form>

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ml-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold">
                Reviewer: {review.reviewer_name || "Anonymous"}
              </h3>
              <p className="text-gray-700">Rating: {review.rating}/10</p>
              <p className="text-gray-600">{review.comments}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No reviews found</p>
      )}
    </div>
  );
}

export default ReviewSearchPage;
