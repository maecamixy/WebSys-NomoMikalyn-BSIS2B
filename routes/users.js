const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");

// CREATE a user
router.post("/", async (req, res) => {
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age === "" || req.body.age == null
                ? null
                : Number(req.body.age)
        });

        return res.status(201).json(user);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// READ all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        return res.json(users);
    } catch (err) {
        return res.status(500).json({ error: "Could not load users." });
    }
});

// UPDATE a user
router.put("/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: "Invalid user ID." });
        }

        const updated = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ error: "User not found." });
        }

        return res.json(updated);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

// DELETE a user
router.delete("/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: "Invalid user ID." });
        }

        const deleted = await User.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: "User not found." });
        }

        return res.json({ message: "User deleted." });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

module.exports = router;
