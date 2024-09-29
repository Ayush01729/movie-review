// // src/components/MoviesList.js
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { fetchMovies } from "../api";
// import Navbar from "./Navbar";

// function MoviesList() {
//   const [movies, setMovies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const navigate = useNavigate();

//   const handleMovieClick = (movieId) => {
//     // Navigate to the movie review page when the box is clicked
//     navigate(`/reviews/${movieId}/reviews`);
//   };

//   useEffect(() => {
//     const getMovies = async () => {
//       const fetchedMovies = await fetchMovies();
//       setMovies(fetchedMovies);
//     };
//     getMovies();
//   }, []);

//   return (
//     <div className="container mx-auto p-8">
//       <Navbar />
//       <h2 className="text-center text-2xl font-bold mb-8">
//         The best movie reviews site!
//       </h2>

//       <div className="flex justify-center mb-8">
//         <input
//           type="text"
//           placeholder="Search for your favourite movie"
//           className="border rounded px-4 py-2 w-full max-w-md"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {movies.map((movie) => (
//           <div
//             key={movie.id}
//             className="bg-purple-100 p-4 rounded-lg shadow-md"
//           >
//             <h3 className="text-xl font-semibold mb-2">{movie.name}</h3>
//             <p className="text-gray-600">Released: {movie.release_date}</p>
//             <p className="text-gray-600">
//               Rating: {movie.average_rating || "N/A"}
//             </p>
//             <div className="flex justify-end space-x-2 mt-4">
//               <Link
//                 to={`/edit-movie/${movie.id}`}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <i className="fas fa-edit"></i>
//               </Link>
//               <button className="text-gray-500 hover:text-red-700">
//                 <i className="fas fa-trash"></i>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MoviesList;

// src/components/MoviesList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies, deleteMovie } from "../api";
import Navbar from "./Navbar";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleEditClick = (movieId) => {
    navigate(`/edit-movie/${movieId}`);
  };

  const handleDeleteClick = async (movieId) => {
    await deleteMovie(movieId);
    setMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.id !== movieId)
    );
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleMovieClick = (movieId) => {
    // Navigate to the movie review page when the box is clicked
    navigate(`/movies/${movieId}`);
  };

  useEffect(() => {
    const getMovies = async () => {
      const fetchedMovies = await fetchMovies();
      setMovies(fetchedMovies);
    };
    getMovies();
  }, [handleDeleteClick]);

  return (
    <div className="container mx-auto ">
      <Navbar />
      <h2 className="text-left text-2xl font-bold mb-8 ml-4 mt-8">
        The best movie reviews site!
      </h2>

      <div className="flex justify-left mb-8 ml-4">
        <input
          type="text"
          placeholder="Search for your favourite movie"
          className="border rounded px-4 py-2 w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ml-4">
        {movies
          .filter((movie) =>
            movie.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((movie) => (
            <div
              className="bg-purple-100 p-4 rounded-lg shadow-md"
              // Clicking this box will navigate to the reviews page
            >
              <h3
                className="text-xl font-semibold mb-2 cursor-pointer underline"
                key={movie.id}
                onClick={() => handleMovieClick(movie.id)}
              >
                {movie.name}
              </h3>
              <p className="text-gray-600">
                Released: {formatDate(movie.release_date)}
              </p>
              <br></br>
              <p className="text-gray-600">
                {" "}
                <strong>Rating: {movie.average_rating || "N/A"} / 10</strong>
              </p>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => handleEditClick(movie.id)}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  className="text-gray-500 hover:text-red-700"
                  onClick={() => handleDeleteClick(movie.id)}
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

export default MoviesList;

{
  /* <div className="flex justify-end space-x-2 mt-4">
                {/* Removed <Link> and kept only the click handler for navigation */
}
//     <button className="text-gray-500 hover:text-red-700">
//       <i className="fas fa-trash"></i>
//     </button>
//   </div>
// </div> */}
