import { Navigate } from "react-router";

const STORAGE_KEY = import.meta.env.VITE_LOCAL_STORAGE_KEY;

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const storageData = localStorage.getItem(STORAGE_KEY);
  if (storageData === undefined || storageData === null) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default AuthGuard;
