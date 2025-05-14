import axios from "axios";

const WASENDER_API_KEY = process.env.WASENDER_API_KEY;

const sendMessage = async (to, text) => {
	console.log("🔔 Sending message to", to, text);
	console.log("🔔 WASENDER_API_KEY", WASENDER_API_KEY);
	const response = await fetch("https://www.wasenderapi.com/api/send-message", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${WASENDER_API_KEY}`,
			"Content-Type": "application/json",
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36",
		},
		body: JSON.stringify({
			to,
			text,
		}),
	});

	const result = await response.json();
	console.log(result);
};

export default sendMessage;
