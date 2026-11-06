import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { destinations } from "../data/destinations";

function Booking() {

  const { id } = useParams();
  const navigate = useNavigate();

  const place = destinations.find(
    (item) => item.id === Number(id)
  );

  const currentUser = JSON.parse(
    localStorage.getItem("travelgoCurrentUser") || "null"
  );

  const [date, setDate] = useState("");
  const [travellers, setTravellers] = useState(1);

  if (!place || !currentUser) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Destination or user not found.
        </div>
      </div>
    );
  }

  const totalPrice = place.price * Number(travellers);

  function handleBooking(e) {
    e.preventDefault();

    const booking = {
      bookingId: Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      email: currentUser.email,

      destination: {
        id: place.id,
        name: place.name,
        country: place.country,
        price: place.price
      },

      travelDate: date,
      travellers: Number(travellers),
      totalPrice: totalPrice,
      status: "Confirmed"
    };

    const bookings = JSON.parse(
      localStorage.getItem("travelgoBookings") || "[]"
    );

    bookings.push(booking);

    localStorage.setItem(
      "travelgoBookings",
      JSON.stringify(bookings)
    );

    alert("Booking Successful!");

    navigate("/history");
  }

  return (
    <div className="container mt-5 mb-5">

      <div className="row justify-content-center">

        <div className="col-md-7">

          <div className="card shadow">

            <div className="card-body p-4">

              <h2 className="text-center text-success mb-4">
                Trip Booking
              </h2>

              <img
                src={place.image}
                alt={place.name}
                className="img-fluid rounded mb-3 w-100"
                style={{ height: "250px", objectFit: "cover" }}
              />

              <h3>{place.name}, {place.country}</h3>

              <p>{place.description}</p>

              <p>
                <strong>Price per person:</strong> ₹{place.price}
              </p>

              <form onSubmit={handleBooking}>

                <div className="mb-3">
                  <label className="form-label">
                    Customer Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={currentUser.name}
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    value={currentUser.email}
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Travel Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    min={new Date().toISOString().split("T")[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Number of Travellers
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    max="20"
                    value={travellers}
                    onChange={(e) =>
                      setTravellers(e.target.value)
                    }
                    required
                  />
                </div>

                <div className="alert alert-success">
                  <h5>
                    Total Amount: ₹{totalPrice}
                  </h5>
                </div>

                <button className="btn btn-success w-100">
                  Confirm Booking
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Booking;