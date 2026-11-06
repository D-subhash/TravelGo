import React, { useState } from "react";
import { Link } from "react-router-dom";
import { destinations } from "../data/Destinations";
function Destinations() {

  const [search, setSearch] = useState("");
  const [budget, setBudget] = useState("all");

  const filteredDestinations = destinations.filter((place) => {

    const matchesSearch =
      place.name.toLowerCase().includes(search.toLowerCase()) ||
      place.category.toLowerCase().includes(search.toLowerCase());

    const matchesBudget =
      budget === "all" ||
      (budget === "low" && place.price <= 6000) ||
      (budget === "medium" && place.price > 6000 && place.price <= 8500) ||
      (budget === "high" && place.price > 8500);

    return matchesSearch && matchesBudget;
  });

  return (
    <div className="container mt-5 mb-5">

      <h2 className="text-center text-success mb-2">
        Explore Destinations
      </h2>

      <p className="text-center text-muted mb-4">
        Discover your favourite travel destinations.
      </p>

      <div className="row mb-4">

        <div className="col-md-7 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search destinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-5 mb-2">
          <select
            className="form-select"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="all">All Budgets</option>
            <option value="low">Below ₹6000</option>
            <option value="medium">₹6000 - ₹8500</option>
            <option value="high">Above ₹8500</option>
          </select>
        </div>

      </div>

      <div className="row">

        {filteredDestinations.map((place) => (

          <div className="col-md-4 mb-4" key={place.id}>

            <div className="card shadow h-100">

              <img
                src={place.image}
                className="card-img-top"
                alt={place.name}
                style={{ height: "220px", objectFit: "cover" }}
              />

              <div className="card-body">

                <span className="badge bg-success mb-2">
                  {place.category}
                </span>

                <h4>{place.name}</h4>

                <p className="text-muted">
                  {place.description}
                </p>

                <p>
                  <strong>Country:</strong> {place.country}
                </p>

                <p>
                  <strong>Duration:</strong> {place.days} Days
                </p>

                <h5 className="text-success">
                  ₹{place.price} / Person
                </h5>

                <Link
                  to={`/booking/${place.id}`}
                  className="btn btn-success w-100 mt-2"
                >
                  Book Now
                </Link>

              </div>
            </div>

          </div>

        ))}

      </div>

      {filteredDestinations.length === 0 && (
        <h5 className="text-center text-danger">
          No destinations found!
        </h5>
      )}

    </div>
  );
}

export default Destinations;