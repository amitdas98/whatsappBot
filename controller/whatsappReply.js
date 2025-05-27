import { sendMessage, sendMessageUsingSDK } from "./waSenderAPI.js";
import generateReply from "./gemini.js";
import logger from "../utils/logger.js";
import { createMessage, getMessages } from "./messages.js";
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
		let messageFromUser;
		if (event?.messages?.message?.conversation) {
			messageFromUser = event?.messages?.message?.conversation;
			const data = {
				message: messageFromUser,
				messageType: "USER",
				timestamp: new Date().toISOString(),
				messageId: event?.messages?.key?.id,
				uid: senderJid,
			};
			await createMessage(data);
		}
		const messages = await getMessages(senderJid);
		const reply = await generateReply(messageFromUser, { messages });
		logger(
			`🔔 Reply for message ${messageFromUser} is ${reply} for user ${senderJid}`
		);
		if (reply) {
			const data = {
				message: reply,
				messageType: "BOT",
				timestamp: new Date().toISOString(),
				messageId: event?.messages?.key?.id,
				uid: senderJid,
			};
			await createMessage(data);
		}
		const response = await sendMessageUsingSDK(senderJid, reply);
		logger("🔔 Response from waSenderAPI", response);
	} catch (error) {
		logger("🔔 Error in replyToMessage", error);
	}
};

export default replyToMessage;
