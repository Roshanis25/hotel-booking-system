import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import { DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

function HomeScreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState([]);

  const [searchkey, setsearchkey] = useState("");
  const [type, settype] = useState("all");

  useEffect(() => {
    async function fetchData() {
      try {
        setloading(true);
        // Ensure your server is running on port 5000 and proxy is set in package.json
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setrooms(data);
        setduplicaterooms(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    }
    fetchData();
  }, []);

  // 1. Filter by Date Range
  function filterByDate(dates) {
    if (!dates) {
      setrooms(duplicaterooms);
      return;
    }

    const start = dates[0].format("DD-MM-YYYY");
    const end = dates[1].format("DD-MM-YYYY");
    setfromdate(start);
    settodate(end);

    var tempRooms = [];
    
    for (const room of duplicaterooms) {
      var availability = true;

      if (room.currentBookings.length > 0) {
        for (const booking of room.currentBookings) {
          // Check if selected start or end date falls within any existing booking range
          if (
            moment(start, "DD-MM-YYYY").isBetween(booking.fromDate, booking.toDate) ||
            moment(end, "DD-MM-YYYY").isBetween(booking.fromDate, booking.toDate) ||
            moment(booking.fromDate, "DD-MM-YYYY").isBetween(start, end) ||
            moment(booking.toDate, "DD-MM-YYYY").isBetween(start, end) ||
            start === booking.fromDate || start === booking.toDate ||
            end === booking.fromDate || end === booking.toDate
          ) {
            availability = false;
            break; 
          }
        }
      }

      if (availability || room.currentBookings.length === 0) {
        tempRooms.push(room);
      }
    }
    setrooms(tempRooms);
  }

  // 2. Filter by Search Input
  function filterBySearch() {
    const tempRooms = duplicaterooms.filter((room) =>
      room.name.toLowerCase().includes(searchkey.toLowerCase())
    );
    setrooms(tempRooms);
  }

  // 3. Filter by Room Type (Deluxe/Non-Deluxe)
  function filterByType(e) {
    settype(e);
    if (e !== "all") {
      const tempRooms = duplicaterooms.filter(
        (room) => room.type.toLowerCase() === e.toLowerCase()
      );
      setrooms(tempRooms);
    } else {
      setrooms(duplicaterooms);
    }
  }

  return (
    <div className="container">
      {/* FILTER BAR */}
      <div className="row mt-5 bs p-3">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>

        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="search rooms"
            value={searchkey}
            onChange={(e) => setsearchkey(e.target.value)}
            onKeyUp={filterBySearch}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            onChange={(e) => filterByType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="deluxe">Deluxe</option>
            <option value="non-deluxe">Non-Deluxe</option>
          </select>
        </div>
      </div>

      {/* ROOMS LIST */}
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Error fetching data...</h1>
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-2" key={room._id}>
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default HomeScreen;