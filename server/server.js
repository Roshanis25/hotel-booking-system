const express = require("express");
const cors = require("cors");
const app = express();

// 1. Import Database Connection
const dbConfig = require('./db'); 

// 2. Import Route Files
const roomsRoute = require('./routes/roomsRoute');
const usersRoute = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute'); // Added for bookings

// 3. Middleware
// Required to parse JSON data sent from the React frontend via Axios
app.use(cors());
app.use(express.json());

// 4. Link the Routes
// Base paths for our API endpoints

app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingsRoute); // Connects the booking logic

// 5. Root Route (Optional - for testing)
app.get("/", (req, res) => {
    res.send("Server is running smoothly!");
});

// 6. Define the Port
const port = process.env.PORT || 5000;

// 7. Start the Server
app.listen(port, () => console.log(`Node Server Started on Port ${port} using Nodemon`));