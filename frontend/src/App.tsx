import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Sessions from "./components/Sessions/Sessions";
import NewSession from "./components/Sessions/NewSession";
import ViewSession from "./components/Sessions/ViewSession";
import Clients from "./components/Clients/Clients";
import Categories from "./components/Categories/Categories";
import ViewProfile from "./components/Profile/ViewProfile";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

// luismendez

function App() {
  return (
    <BrowserRouter>
      <div className="App d-flex w-100">
        <Navbar />
        <main className="w-80 mx-auto vh-100 overflow-y-scroll mt-3">
          <Routes>
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/profile" element={<ViewProfile />} />
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
