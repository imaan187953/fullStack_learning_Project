import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home/Home";
import SearchPage from "./pages/Search/Search";
import MoviePage from "./pages/Movie/MoviePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import TVPage from "./pages/TV/TVPage";
import ListsPage from "./pages/Lists/ListsPage";
import ListDetailPage from "./pages/Lists/ListDetailsPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import MyReviewsPage from "./pages/Profile/MyReviewsPage";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/home" element={<Home />} />

      <Route path="/search" element={<SearchPage />} />

      <Route
        path="/movie/:id"
        element={
          <ProtectedRoute>
            <MoviePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tv/:id"
        element={
          <ProtectedRoute>
            <TVPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lists"
        element={
          <ProtectedRoute>
            <ListsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lists"
        element={
          <ProtectedRoute>
            <ListsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lists/:id"
        element={
          <ProtectedRoute>
            <ListDetailPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/reviews"
        element={<MyReviewsPage />}
      />



    </Routes>
  );
}

export default App;