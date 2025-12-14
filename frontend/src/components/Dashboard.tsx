import Navbar from "./Navbar/navbar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="App d-flex w-100">
      <Navbar />
      <main className="w-80 mx-auto vh-100 overflow-y-scroll mt-3">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
