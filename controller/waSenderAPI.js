import axios from "axios";
import wasender from "../sdks/waSenderAPI.js";
const WASENDER_API_KEY = process.env.WASENDER_API_KEY;

import logger from "../utils/logger.js";

const sendMessage = async (to, text) => {
    logger("🔔 Sending message to", to, text);
    const response = await axios({
        method: "POST",
        url: "https://www.wasenderapi.com/api/send-message",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${WASENDER_API_KEY}`,
            Accept: "application/json",
            Origin: "https://wasenderapi.com",
            Referer: "https://wasenderapi.com/",
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "CF-Access-Client-Id": WASENDER_API_KEY,
            "CF-Access-Client-Secret": WASENDER_API_KEY,
            "X-Requested-With": "XMLHttpRequest",
            Connection: "keep-alive",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            DNT: "1",
        },
        data: {
            to,
            text,
        },
    });

    const result = response.data;
    logger("result", result);
};

const sendMessageUsingSDK = async (to, text) => {
    try {
        const textPayload = {
            messageType: "text",
            to: to,
            text: text,
        };
        const result = await wasender.send(textPayload);
        if (result?.success) {
            logger("🔔 Message sent successfully");
            return {
                message: "Message sent successfully",
                error: null,
            };
        }
        if (result?.rateLimit?.remaining === 0) {
            logger("🔔 Rate limit exceeded");
            logger(`retry after ${result?.rateLimit?.resetTimestamp} seconds`);
            return {
                message: "Rate limit exceeded",
                error: "Rate limit exceeded",
            };
        }
        logger("result", result);
    } catch (error) {
        logger("🔔 Error in sendMessageUsingSDK", error);
        return {
            message: "Error in sendMessageUsingSDK",
            error: error,
        };
    }
};

export { sendMessage, sendMessageUsingSDK };
