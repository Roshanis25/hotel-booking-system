const express = require("express");
const router = express.Router();
const Room = require("../models/room");

// ROUTE 1: Fetch all rooms for the Home Screen
router.get("/getallrooms", async (req, res) => {
    try {
        const rooms = await Room.find({});
        res.send(rooms);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

// ROUTE 2: Fetch a single room for the Booking Screen
router.post("/getroombyid", async (req, res) => {
    const { roomid } = req.body;

    try {
        const room = await Room.findOne({ _id: roomid });
        if (room) {
            res.send(room);
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;