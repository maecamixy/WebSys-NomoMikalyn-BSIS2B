const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const usersRouter = require("./routes/users");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", usersRouter);

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

async function start() {
    try {
        if (!process.env.MONGO_URI ||
            process.env.MONGO_URI.includes("PASTE_YOUR_")) {
            throw new Error("Add your MongoDB Atlas connection string to the .env file first.");
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Startup error:", err.message);
        process.exit(1);
    }
}

start();
