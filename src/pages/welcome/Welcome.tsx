import { WELCOME_SCREEN_DELAY } from "@/consts";
import { useEffect } from "react";
import { useNavigate } from "react-router";

let timeout: NodeJS.Timeout;

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      navigate("/login", { replace: true });
    }, WELCOME_SCREEN_DELAY);
  }, [navigate]);

  return (
    <div>
      <h1>Welcome Screen</h1>
    </div>
  );
};

export default Welcome;
