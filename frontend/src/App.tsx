import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import NewSession from "./components/NewSession/NewSession";
import ViewSession from "./components/ViewSession/ViewSession";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

// luismendez

function App() {
  return (
    <BrowserRouter>
      <div className="App d-flex w-100">
        <Navbar />
        <main className="w-80 mx-auto vh-100 overflow-y-scroll">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/newsession" element={<NewSession />} />
            <Route path="/session/:sessionID" element={<ViewSession />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
