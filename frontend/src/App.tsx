import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Sessions from "./components/Sessions/Sessions";
import NewSession from "./components/NewSession/NewSession";
import ViewSession from "./components/ViewSession/ViewSession";
import ViewClients from "./components/Clients/ViewClients";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

// luismendez

function App() {
  return (
    <BrowserRouter>
      <div className="App d-flex w-100">
        <Navbar />
        <main className="w-80 mx-auto vh-100 overflow-y-scroll">
          <Routes>
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/clients" element={<ViewClients />} />
            <Route path="/newsession" element={<NewSession />} />
            <Route path="/sessions/:sessionID" element={<ViewSession />} />
            <Route path="*" element={<Navigate to="/sessions" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
