import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading, lastLoginTime } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Check if session has expired (more than 5 minutes since last login)
  const isSessionExpired = lastLoginTime && (Date.now() - lastLoginTime > SESSION_TIMEOUT);

  if (!isAuthenticated || isSessionExpired) {
    // Redirect to login page with the return url
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};