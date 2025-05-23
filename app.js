import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "./utils/logger.js";
// require the whatsapp route from routes folder
import whatsappRoute from "./routes/whatsapp.js";

import dotenv from "dotenv";
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/whatsapp', whatsappRoute)

app.get("/health", (req, res) => {
	logger("health check");
	res.status(200).json({ message: "Server is healthy" });
});

// Start Server
const PORT = 5001;
app.listen(PORT, () =>
	logger(`Server running on http://localhost:${PORT}`)
);
