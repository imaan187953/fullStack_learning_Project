import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PublicRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();

  // Prevent redirect while checking auth state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-lg font-medium text-white">
          Loading...
        </div>
      </div>
    );
  }

  // Logged-in users shouldn't see login/register again
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default PublicRoute;