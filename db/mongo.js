import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
dotenv.config();
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: "whatsapp",
	})
	.then(() => logger("Connected to MongoDB"))
	.catch((err) => logger("MongoDB connection error:", err.message)); // Log error message

const whatsappMessages = new mongoose.Schema({
	event: { type: String },
	sessionId: { type: String },
	data: {
		type: mongoose.Schema.Types.Mixed,
	},
	timestamp: {
		type: Date,
	},
});

const whatsapp = mongoose.model("whatsapp", whatsappMessages);

export { whatsapp };
