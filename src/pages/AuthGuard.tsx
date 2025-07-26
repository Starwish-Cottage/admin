import React from "react";
import { useNavigate } from "react-router";
import { verifySession } from "@/api/verify_session";

const STORAGE_KEY = import.meta.env.VITE_LOCAL_STORAGE_KEY;

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
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
        await verifySession(session_token);
        navigate("/dashboard", { replace: true });
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
        navigate("/login", { replace: true });
        console.error("Session verification failed:", error);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, [navigate]);

  return loading ? <></> : children;
};

export default AuthGuard;
