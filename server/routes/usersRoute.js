const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Ensure this path matches your User model file

// REGISTER ROUTE
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });

    try {
        await newUser.save();
        res.send('User Registered Successfully');
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user with matching email and password
        const user = await User.findOne({ email: email, password: password });

        if (user) {
            // We create a temp object to avoid sending the password to the frontend
            const temp = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id,
            };
            res.send(temp);
        } else {
            return res.status(400).json({ message: 'Login Failed: Invalid Credentials' });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

module.exports = router;