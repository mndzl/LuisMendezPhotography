/*
  This dashboard will be visible to photographer to see the
  status of their upcoming and previous sessions,
  with the ability of 
    - view status of last session (images backed up, editing, purchases available, closed)
    - view clients with information
*/
import Navbar from "./Navbar/navbar.tsx";

function Dashboard() {
  return (
    <div className="d-flex">
      <Navbar />
      <h1>Dashboard view</h1>
    </div>
  );
}

export default Dashboard;
