import Navbar from "./Navbar/navbar";
import { Outlet } from "react-router-dom";
import "./dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container d-flex w-100">
      <Navbar />
      <main className="w-80 dashboard mx-auto vh-100 overflow-y-scroll mt-3">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
