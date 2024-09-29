// src/components/AddEditMovie.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieById, addMovie, editMovie } from "../api"; // Ensure you have these functions in your API

function AddEditMovie({ isEditMode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    name: "",
    release_date: "",
    average_rating: "",
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchMovie = async () => {
        try {
          const fetchedMovie = await fetchMovieById(id);
          setMovie(fetchedMovie);
        } catch (error) {
          console.error("Failed to fetch movie", error);
        }
      };
      fetchMovie();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await editMovie(id, movie);
      } else {
        await addMovie(movie);
      }
      navigate("/", {
        state: {
          message: isEditMode ? "Successfully Edited" : "Successfully Created",
        },
      });
    } catch (error) {
      console.error("Failed to save movie", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">
        {isEditMode ? "Edit Movie" : "Add New Movie"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={movie.name}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Release Date</label>
          <input
            type="date"
            name="release_date"
            value={movie.release_date}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700 mb-2">Average Rating</label>
          <input
            type="number"
            name="average_rating"
            value={movie.average_rating}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
        </div> */}
        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          {isEditMode ? "Save Changes" : "Create Movie"}
        </button>
      </form>
    </div>
  );
}

export default AddEditMovie;
