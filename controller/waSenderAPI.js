import axios from "axios";

const WASENDER_API_KEY = process.env.WASENDER_API_KEY;

const sendMessage = async (to, text) => {
    console.log("🔔 Sending message to", to, text);
    console.log("🔔 WASENDER_API_KEY", WASENDER_API_KEY);
    const response = await axios.post("https://wasenderapi.com/api/send-message", {
        to,
        text
    }, {
        headers: {
            Authorization: `Bearer ${WASENDER_API_KEY}`,
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.9",
            "Origin": "https://wasenderapi.com",
            "Referer": "https://wasenderapi.com/"
        }
    });
    return response.data;
};

export default sendMessage; 

