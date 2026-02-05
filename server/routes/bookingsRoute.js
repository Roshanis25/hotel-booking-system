const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");

// Simple Booking Route (No Payment Gateway)
router.post("/bookroom", async (req, res) => {
    const { 
        room, 
        userid, 
        fromdate, 
        todate, 
        totalamount, 
        totaldays, 
        transactionId // We'll pass a generated ID from the frontend
    } = req.body;

    try {
        // 1. Create and save the new booking
        const newbooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate,
            todate,
            totalamount,
            totaldays,
            transactionId,
            status: 'booked'
        });

        const booking = await newbooking.save();

        // 2. Update the Room's currentbookings array to block these dates
        const roomtemp = await Room.findOne({ _id: room._id });
        
        roomtemp.currentbookings.push({
            bookingid: booking._id,
            fromdate,
            todate,
            userid,
            status: booking.status
        });

        await roomtemp.save();

        res.status(200).send("Room Booked Successfully");

    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: "Internal Server Error" });
    }
});

// Get bookings for a specific user
router.post("/getbookingsbyuserid", async (req, res) => {
    const userid = req.body.userid;
    try {
        const bookings = await Booking.find({ userid: userid });
        res.send(bookings);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;