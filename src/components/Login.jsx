
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const users = JSON.parse(
      localStorage.getItem("travelgoUsers") || "[]"
    );

    const foundUser = users.find(
      (u) =>
        u.email.toLowerCase() === login.email.trim().toLowerCase() &&
        u.password === login.password
    );

    if (foundUser) {
      const currentUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email
      };

      localStorage.setItem(
        "travelgoCurrentUser",
        JSON.stringify(currentUser)
      );

      // Update navbar immediately
      onLogin(currentUser);

      setMessage("");
      navigate("/destinations");
    } else {
      setMessage("Invalid email or password. Please sign up first.");
    }
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              <h2 className="text-center text-success">
                TravelGo
              </h2>

              <h4 className="text-center mb-4">
                User Login
              </h4>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={login.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={login.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {message && (
                  <div className="alert alert-danger">
                    {message}
                  </div>
                )}

                <button className="btn btn-success w-100">
                  Login
                </button>
              </form>

              <p className="text-center mt-3">
                Don't have an account?
                <Link to="/signup" className="ms-2">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
