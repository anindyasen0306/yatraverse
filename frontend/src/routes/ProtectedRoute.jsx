import { Navigate, useLocation } from "react-router-dom";
import { STORAGE_KEYS } from "@/config/constants";

/**
 * Redirects unauthenticated users to /login.
 * Phase 5 will replace the localStorage check with AuthContext.
 */
export function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}