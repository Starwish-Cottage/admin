import React from "react";
import { useLocation, useNavigate } from "react-router";
import { verifySession } from "@/api/verify_session";

const STORAGE_KEY = import.meta.env.VITE_LOCAL_STORAGE_KEY;

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkSession = async () => {
      const storageData = localStorage.getItem(STORAGE_KEY);
      if (!storageData) {
        navigate("/login", { replace: true });
        setLoading(false);
        return;
      }
      const { session_token } = JSON.parse(storageData);
      try {
        // TODO: Implement session expiration notification
        await verifySession(session_token);
        if (location.pathname === "/login") {
          navigate("/dashboard", { replace: true });
        }
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
        navigate("/login", { replace: true });
        console.error("Session verification failed:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 100);
      }
    };
    checkSession();
  }, [navigate, location]);

  return loading ? <></> : children;
};

export default AuthGuard;
