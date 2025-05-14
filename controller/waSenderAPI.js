import axios from "axios";

const WASENDER_API_KEY = process.env.WASENDER_API_KEY;

// ... existing code ...

const sendMessage = async (to, text) => {
	console.log("🔔 Sending message to", to, text);
	console.log("🔔 WASENDER_API_KEY", WASENDER_API_KEY);
	const response = await axios({
		method: "POST",
		url: "https://www.wasenderapi.com/api/send-message",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${WASENDER_API_KEY}`,
			"Accept": "application/json",
			"Origin": "https://wasenderapi.com",
			"Referer": "https://wasenderapi.com/",
			"Sec-Fetch-Site": "same-origin",
			"Sec-Fetch-Mode": "cors",
			"Sec-Fetch-Dest": "empty",
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
		},
		data: {
			to,
			text,
		},
	});

	const result = response.data;
	console.log(result);
};

// ... existing code ...

export default sendMessage;
