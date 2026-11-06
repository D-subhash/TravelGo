import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let users = JSON.parse(
      localStorage.getItem("travelgoUsers") || "[]"
    );

    let exists = users.find(
      (u) => u.email.toLowerCase() === user.email.trim().toLowerCase()
    );

    if (exists) {
      setMessage("Email already registered!");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: user.name.trim(),
      email: user.email.trim(),
      password: user.password
    };

    users.push(newUser);

    localStorage.setItem(
      "travelgoUsers",
      JSON.stringify(users)
    );

    setMessage("Registration successful!");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-5">

          <div className="card shadow-lg border-0">
            <div className="card-body p-4">

              <h2 className="text-center text-success mb-3">
                TravelGo
              </h2>

              <h4 className="text-center mb-4">
                Create Account
              </h4>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"
                    value={user.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={user.email}
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
                    placeholder="Create password"
                    minLength="6"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {message && (
                  <div className="alert alert-info">
                    {message}
                  </div>
                )}

                <button className="btn btn-success w-100">
                  Sign Up
                </button>

              </form>

              <p className="text-center mt-3">
                Already have an account?
                <Link to="/login" className="ms-2">
                  Login
                </Link>
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Signup;