import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function BookingScreen() {
  const { roomid, fromdate, todate } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState();
  const [success, setSuccess] = useState(false);

  const firstdate = moment(fromdate, "DD-MM-YYYY");
  const lastdate = moment(todate, "DD-MM-YYYY");
  const totaldays = moment.duration(lastdate.diff(firstdate)).asDays() + 1;
  const [totalamount, setTotalamount] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentuser"));
    if (!user) {
      window.location.href = "/login";
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        const data = (await axios.post("/api/rooms/getroombyid", { roomid })).data;
        setRoom(data);
        setTotalamount(data.rentperday * totaldays);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    }
    fetchData();
  }, [roomid, totaldays]);

  async function bookRoom() {
    const currentUser = JSON.parse(localStorage.getItem("currentuser"));

    const bookingDetails = {
      room,
      userid: currentUser._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      transactionId: "SIMULATED_" + Math.random().toString(36).substr(2, 9),
    };

    try {
      setLoading(true);
      await axios.post("/api/bookings/bookroom", bookingDetails);
      setLoading(false);
      setSuccess(true);
      
      setTimeout(() => {
        window.location.href = "/profile";
      }, 2000);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message="Error loading room. Please try again." />
      ) : room ? (
        <div className="row justify-content-center mt-5 bs">
          <div className="col-md-6">
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} className="bigimg" alt={room.name} />
          </div>

          <div className="col-md-6" style={{ textAlign: "right" }}>
            <div>
              <h1>Booking Details</h1>
              <hr />
              {success && <Success message="Booking successful! Redirecting..." />}
              <p><b>Name :</b> {JSON.parse(localStorage.getItem("currentuser")).name}</p>
              <p><b>From :</b> {fromdate}</p>
              <p><b>To :</b> {todate}</p>
            </div>

            <div className="mt-5">
              <h1>Amount</h1>
              <hr />
              <p>Total Days : {totaldays}</p>
              <p>Rent per day : {room.rentperday}</p>
              <p><b>Total Amount : {totalamount} /-</b></p>
            </div>

            <div style={{ float: "right" }}>
              <button className="btn btn-primary" onClick={bookRoom}>
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default BookingScreen;