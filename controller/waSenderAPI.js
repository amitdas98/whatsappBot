import axios from "axios";

const WASENDER_API_KEY = process.env.WASENDER_API_KEY;

const sendMessage = async (to, text) => {
    const response = await axios.post("https://wasenderapi.com/api/send-message", {
        to,
        text
    }, {
        headers: {
            Authorization: `Bearer ${WASENDER_API_KEY}`,
            "Content-Type": "application/json"
        }
    });
    return response.data;
};

export default sendMessage; 

