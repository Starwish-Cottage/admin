import { Outlet } from "react-router";
import Header from "./Header";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Header />
      <Outlet />
    </div>
  );
};

export default Dashboard;
