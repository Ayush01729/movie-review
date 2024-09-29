// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MoviesList from "./components/MoviesList";
import MovieDetails from "./components/MovieDetails";
import AddEditMovie from "./components/AddEditMovie";
import AddEditReview from "./components/AddEditReview";
import EditReview from "./components/EditReview";
import ReviewSearchPage from "./components/FetchReviews";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/add-movie" element={<AddEditMovie />} />
        <Route path="/add-review" element={<AddEditReview />} />
        <Route path="/search-review" element={<ReviewSearchPage />} />
        <Route
          path="/edit-movie/:id"
          element={<AddEditMovie isEditMode={true} />}
        />
        <Route
          path="/edit-review/:reviewId/:movieId"
          element={<EditReview />}
        />
      </Routes>
    </Router>
  );
}

export default App;
