import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home/Home";
import SearchPage from "./pages/Search/Search";
import MoviePage from "./pages/Movie/MoviePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import TVPage from "./pages/TV/TVPage";

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

      <Route path="/tv/:id"
      element={
        <ProtectedRoute>
          <TVPage />
        </ProtectedRoute>
      }
        />
           
    </Routes>
  );
}

export default App;