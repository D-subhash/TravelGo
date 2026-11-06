
import React, { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/SignUp";
import Destinations from "./components/Destinations";
import Booking from "./components/Booking";
import History from "./components/History";

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() =>
    JSON.parse(
      localStorage.getItem("travelgoCurrentUser") || "null"
    )
  );

  function logout() {
    localStorage.removeItem("travelgoCurrentUser");
    setUser(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            TravelGo
          </Link>

          <div className="navbar-nav ms-auto">
            {user ? (
              <>
                <Link className="nav-link" to="/destinations">
                  Destinations
                </Link>

                <Link className="nav-link" to="/history">
                  Booking History
                </Link>

                <span className="nav-link text-white">
                  Welcome, {user.name}
                </span>

                <button
                  className="btn btn-light btn-sm ms-2"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/signup">
                  Sign Up
                </Link>

                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Login onLogin={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login onLogin={setUser} />}
        />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </>
  );
}

export default App;
