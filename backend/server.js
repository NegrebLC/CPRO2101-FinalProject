require("dotenv").config();
const express = require("express");
const http = require("http");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user_registration/userRoutes");

const app = express();
app.use(bodyParser.json());

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

//defining some routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

// Use the HTTP server to listen, not the Express app directly
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
