import { sendMessage, sendMessageUsingSDK } from "./waSenderAPI.js";
import generateReply from "./gemini.js";
import logger from "../utils/logger.js";
const replyToMessage = async (event) => {
	try {
		logger("🔔 Message received! Need to reply to the message");
		let senderJid = event?.messages?.key?.remoteJid;
		if (senderJid.includes("@s.whatsapp.net")) {
			senderJid = senderJid.replace("@s.whatsapp.net", "");
		}
		if (!senderJid.includes("+")) {
			senderJid = `+${senderJid}`;
		}
		const messageFromUser = event?.messages?.message?.conversation;
		const reply = await generateReply(messageFromUser);
		logger(
			`🔔 Reply for message ${messageFromUser} is ${reply} for user ${senderJid}`
		);
		const response = await sendMessageUsingSDK(senderJid, reply);
		logger("🔔 Response from waSenderAPI", response);
	} catch (error) {
		logger("🔔 Error in replyToMessage", error);
	}
};

export default replyToMessage;
