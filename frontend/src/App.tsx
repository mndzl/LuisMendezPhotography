import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import Sessions from "./components/Sessions/Sessions";
import ViewSession from "./components/Sessions/ViewSession";
import Clients from "./components/Clients/Clients";
import Categories from "./components/Categories/Categories";
import ViewProfile from "./components/Profile/ViewProfile";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Gallery from "./components/Gallery/Gallery";

// luismendez

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout for Dashboard - include navbar */}
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Navigate to="/sessions" />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/profile" element={<ViewProfile />} />
          <Route path="/sessions/:sessionID" element={<ViewSession />} />
        </Route>

        {/* Layout not including navbar */}
        <Route path="/gallery/:galleryID" element={<Gallery />} />

        {/* Other paths redirect to / */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
