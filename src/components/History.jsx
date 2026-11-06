import React, { useState } from "react";

function History() {

  const currentUser = JSON.parse(
    localStorage.getItem("travelgoCurrentUser") || "null"
  );

  const [bookings, setBookings] = useState(() => {

    const allBookings = JSON.parse(
      localStorage.getItem("travelgoBookings") || "[]"
    );

    return allBookings.filter(
      (booking) => currentUser && booking.userId === currentUser.id
    );
  });

  function cancelBooking(id) {

    const allBookings = JSON.parse(
      localStorage.getItem("travelgoBookings") || "[]"
    );

    const updatedBookings = allBookings.map((booking) =>
      booking.bookingId === id
        ? { ...booking, status: "Cancelled" }
        : booking
    );

    localStorage.setItem(
      "travelgoBookings",
      JSON.stringify(updatedBookings)
    );

    setBookings(
      updatedBookings.filter(
        (booking) => booking.userId === currentUser.id
      )
    );
  }

  return (
    <div className="container mt-5 mb-5">

      <h2 className="text-center text-success mb-4">
        My Booking History
      </h2>

      {bookings.length === 0 ? (

        <div className="alert alert-info text-center">
          No bookings available. Please book your first trip!
        </div>

      ) : (

        <div className="row">

          {bookings.map((booking) => (

            <div className="col-md-6 mb-4" key={booking.bookingId}>

              <div className="card shadow h-100">

                <div className="card-body">

                  <h4 className="text-success">
                    {booking.destination.name}
                  </h4>

                  <p>
                    <strong>Booking ID:</strong> {booking.bookingId}
                  </p>

                  <p>
                    <strong>Customer:</strong> {booking.userName}
                  </p>

                  <p>
                    <strong>Email:</strong> {booking.email}
                  </p>

                  <p>
                    <strong>Travel Date:</strong> {booking.travelDate}
                  </p>

                  <p>
                    <strong>Travellers:</strong> {booking.travellers}
                  </p>

                  <h5 className="text-success">
                    Total: ₹{booking.totalPrice}
                  </h5>

                  <span className={`badge ${
                    booking.status === "Confirmed"
                      ? "bg-success"
                      : "bg-danger"
                  }`}>
                    {booking.status}
                  </span>

                  {booking.status === "Confirmed" && (
                    <button
                      className="btn btn-outline-danger w-100 mt-3"
                      onClick={() => cancelBooking(booking.bookingId)}
                    >
                      Cancel Booking
                    </button>
                  )}

                </div>
              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default History;