// src/api.js
const API_URL = "https://movie-review-server-khaki.vercel.app/";

// Fetch all movies
export const fetchMovies = async () => {
  const response = await fetch(`${API_URL}/movies`);
  if (!response.ok) throw new Error("Failed to fetch movies");
  return await response.json();
};

// Fetch a single movie by ID
export const fetchMovieById = async (id) => {
  const response = await fetch(`${API_URL}/movies/${id}`);
  if (!response.ok) throw new Error("Failed to fetch movie");
  return await response.json();
};

// Add a new movie
export const addMovie = async (movieData) => {
  const response = await fetch(`${API_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieData),
  });
  if (!response.ok) throw new Error("Failed to add movie");
  return await response.json();
};

// Edit a movie
export const editMovie = async (id, movieData) => {
  const response = await fetch(`${API_URL}/movies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieData),
  });
  if (!response.ok) throw new Error("Failed to edit movie");
  return await response.json();
};

// Delete a movie
export const deleteMovie = async (id) => {
  const response = await fetch(`${API_URL}/movies/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete movie");
  return await response.json();
};

// Fetch reviews for a specific movie
export const fetchReviewsByMovieId = async (movieId) => {
  const response = await fetch(`${API_URL}/reviews/${movieId}/reviews`);
  if (!response.ok) throw new Error("Failed to fetch reviews");
  return await response.json();
};

// Add a new review
export const addReview = async (movieId, reviewData) => {
  //   const response = await fetch(`${API_URL}/movies/${movieId}/reviews`, {
  const response = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });
  if (!response.ok) throw new Error("Failed to add review");
  return await response.json();
};

// Edit a review
export const editReview = async (movieId, reviewId, reviewData) => {
  const response = await fetch(
    `${API_URL}/reviews/${movieId}/reviews/${reviewId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    }
  );
  if (!response.ok) throw new Error("Failed to edit review");
  return await response.json();
};

// Delete a review
export const deleteReview = async (movieId, reviewId) => {
  const response = await fetch(
    `${API_URL}/reviews/${movieId}/reviews/${reviewId}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) throw new Error("Failed to delete review");
  return await response.json();
};

// Fetch reviews based on search term using fetch API
export const fetchReviewsBySearchTerm = async (searchTerm) => {
  try {
    const response = await fetch(
      `${API_URL}/reviews/search?searchTerm=${encodeURIComponent(searchTerm)}`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching reviews");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching reviews by search term:", error);
    return [];
  }
};
