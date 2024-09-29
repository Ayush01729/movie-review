// src/components/AddEditReview.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addReview, fetchMovies } from "../api"; // Import fetchMovies for the dropdown
import { fetchMovieById } from "../api";
import { editReview } from "../api";

function AddEditReview() {
  const { movie_id, review_id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState({
    movie_id: "", // Added movie_id for the dropdown
    reviewer_name: "",
    rating: 0,
    comments: "",
  });
  const [movies, setMovies] = useState([]); // State to hold movies for the dropdown
  const [isEditMode, setIsEditMode] = useState(false); // State to determine if in edit mode

  // Fetch movies for the dropdown
  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);
    };
    getMovies();
  }, []);

  // Fetch review data if in edit mode
  useEffect(() => {
    if (review_id) {
      setIsEditMode(true);
      const fetchReview = async () => {
        const data = await fetchMovieById(review_id);
        setReview(data);
      };
      fetchReview();
    }
  }, [review_id]);

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     await addReview(review.movie_id, {
  //       movie_id: review.movie_id,
  //       reviewer_name: review.reviewer_name,
  //       rating: review.rating,
  //       comments: review.comments,
  //     });
  //     navigate(`/movies/${review.movie_id}`); // Redirect to the selected movie's page
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      await editReview(review_id, review);
    } else {
      await addReview(review.movie_id, {
        movie_id: review.movie_id,
        reviewer_name: review.reviewer_name,
        rating: review.rating,
        comments: review.comments,
      });
    }
    navigate(`/movies/${review.movie_id}`); // Redirect to the selected movie's page
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">
        {isEditMode ? "Edit Review" : "Add Review"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Select Movie:
          </label>
          <select
            value={review.movie_id}
            onChange={(e) => setReview({ ...review, movie_id: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
            disabled={isEditMode} // Disable dropdown in edit mode
          >
            <option value="">Select a movie</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Reviewer Name:
          </label>
          <input
            type="text"
            value={review.reviewer_name}
            onChange={(e) =>
              setReview({ ...review, reviewer_name: e.target.value })
            }
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Rating (0-10):
          </label>
          <input
            type="number"
            value={review.rating}
            onChange={(e) =>
              setReview({ ...review, rating: Number(e.target.value) })
            }
            max="10"
            min="0"
            step="0.1"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Comments:
          </label>
          <textarea
            value={review.comments}
            onChange={(e) => setReview({ ...review, comments: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
        >
          {isEditMode ? "Save Changes" : "Save"}
        </button>
      </form>
    </div>
  );
}

// export default AddEditReview;

//   return (
//     <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
//       <h1 className="text-2xl font-semibold mb-4">Add Review</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700 font-bold mb-2">
//             Select Movie:
//           </label>
//           <select
//             value={review.movie_id}
//             onChange={(e) => setReview({ ...review, movie_id: e.target.value })}
//             required
//             className="w-full p-2 border border-gray-300 rounded"
//           >
//             <option value="">Select a movie</option>
//             {movies.map((movie) => (
//               <option key={movie.id} value={movie.id}>
//                 {movie.name} (Released: {movie.release_date})
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-gray-700 font-bold mb-2">
//             Reviewer Name:
//           </label>
//           <input
//             type="text"
//             value={review.reviewer_name}
//             onChange={(e) =>
//               setReview({ ...review, reviewer_name: e.target.value })
//             }
//             required
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-bold mb-2">
//             Rating (0-10):
//           </label>
//           <input
//             type="number"
//             value={review.rating}
//             onChange={(e) =>
//               setReview({ ...review, rating: Number(e.target.value) })
//             }
//             max="10"
//             min="0"
//             required
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-bold mb-2">
//             Comments:
//           </label>
//           <textarea
//             value={review.comments}
//             onChange={(e) => setReview({ ...review, comments: e.target.value })}
//             required
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
//         >
//           Save
//         </button>
//       </form>
//     </div>
//   );
// }

export default AddEditReview;

// src/components/AddEditReview.js
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { addReview, editReview, fetchMovies, getReviewById } from "../api"; // Import necessary functions

// function AddEditReview() {
//   const { movie_id, review_id } = useParams(); // Get movie_id and review_id from URL parameters
//   const navigate = useNavigate();
//   const [review, setReview] = useState({
//     movie_id: movie_id || "", // Use movie_id from URL if available
//     reviewer_name: "",
//     rating: 0,
//     comments: "",
//   });
//   const [movies, setMovies] = useState([]); // State to hold movies for the dropdown
//   const [isEditMode, setIsEditMode] = useState(false); // State to determine if in edit mode

//   // Fetch movies for the dropdown
//   useEffect(() => {
//     const getMovies = async () => {
//       const data = await fetchMovies();
//       setMovies(data);
//     };
//     getMovies();
//   }, []);

//   // Fetch review data if in edit mode
//   useEffect(() => {
//     if (review_id) {
//       setIsEditMode(true);
//       const fetchReview = async () => {
//         const data = await getReviewById(review_id);
//         setReview(data);
//       };
//       fetchReview();
//     }
//   }, [review_id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isEditMode) {
//       await editReview(review_id, review);
//     } else {
//       await addReview(review.movie_id, review);
//     }
//     navigate(`/movies/${review.movie_id}`); // Redirect to the selected movie's page
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
//       <h1 className="text-2xl font-semibold mb-4">
//         {isEditMode ? "Edit Review" : "Add Review"}
//       </h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700 font-bold mb-2">
//             Select Movie:
//           </label>
//           <select
//             value={review.movie_id}
//             onChange={(e) => setReview({ ...review, movie_id: e.target.value })}
//             required
//             className="w-full p-2 border border-gray-300 rounded"
//             disabled={isEditMode} // Disable dropdown in edit mode
//           >
//             <option value="">Select a movie</option>
//             {movies.map((movie) => (
//               <option key={movie.id} value={movie.id}>
//                 {movie.name} (Released: {movie.release_date})
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-gray-700 font-bold mb-2">
//             Reviewer Name:
//           </label>
//           <input
//             type="text"
//             value={review.reviewer_name}
//             onChange={(e) =>
//               setReview({ ...review, reviewer_name: e.target.value })
//             }
//             required
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-bold mb-2">
//             Rating (0-10):
//           </label>
//           <input
//             type="number"
//             value={review.rating}
//             onChange={(e) =>
//               setReview({ ...review, rating: Number(e.target.value) })
//             }
//             max="10"
//             min="0"
//             required
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-bold mb-2">
//             Comments:
//           </label>
//           <textarea
//             value={review.comments}
//             onChange={(e) => setReview({ ...review, comments: e.target.value })}
//             required
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
//         >
//           {isEditMode ? "Save Changes" : "Save"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddEditReview;
