require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes");

// Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// Routes
app.get("/", async (req, res) => {
	res.send("Hello!");
});

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// Connect to database
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		// Listen for requests
		app.listen(process.env.PORT, () => {
			console.log(
				"Connected to database & Listening on port: ",
				process.env.PORT
			);
		});
	})
	.catch((err) => {
		console.log(err);
	});
