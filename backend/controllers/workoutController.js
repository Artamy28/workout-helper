const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// GET all workouts
const getWorkouts = async (req, res) => {
	const user_id = req.user._id;
	const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
	res.status(200).json(workouts);
};

// GET single workout
const getWorkout = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such workout to GET" });
	}

	const workout = await Workout.findById(id);

	if (!workout) {
		return res.status(404).json({ error: "No such workout to GET" });
	}

	res.status(200).json(workout);
};

// POST new workout
const createWorkout = async (req, res) => {
	const { title, load, reps } = req.body;

	let emptyFields = [];

	if (!title) {
		emptyFields.push("title");
	}
	if (!load) {
		emptyFields.push("load");
	}
	if (!reps) {
		emptyFields.push("reps");
	}
	if (emptyFields.length > 0) {
		return res
			.status(400)
			.json({ error: "Please fill in all the fields", emptyFields });
	}
	// Add document to database
	try {
		const user_id = req.user._id;
		const workout = await Workout.create({ title, load, reps, user_id });
		res.status(200).json(workout);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// DELETE single workout
const deleteWorkout = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such workout to DELETE" });
	}

	const workout = await Workout.findByIdAndDelete({ _id: id });

	if (!workout) {
		return res.status(404).json({ error: "No such workout to DELETE" });
	}

	res.status(200).json(workout);
};

// UPDATE single workout
const updateWorkout = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "No such workout to UPDATE" });
	}

	const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

	if (!workout) {
		return res.status(404).json({ error: "No such workout to UPDATE" });
	}

	res.status(200).json(workout);
};

module.exports = {
	getWorkouts,
	getWorkout,
	createWorkout,
	deleteWorkout,
	updateWorkout,
};
