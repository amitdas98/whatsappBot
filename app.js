const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// require the whatsapp route from routes folder
const whatsappRoute = require("./routes/whatsapp");

require("dotenv").config(); 
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/whatsapp', whatsappRoute)

app.get("/health", (req, res) => {
	console.log("health check");
	res.status(200).json({ message: "Server is healthy" });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}`)
);
