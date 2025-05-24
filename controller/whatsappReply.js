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
		let messageFromUser;
		let isReplyingToMyMessage = false;
		let messageWhichIsGettingRepliedTo;
		if (event?.messages?.message?.conversation) {
			messageFromUser = event?.messages?.message?.conversation;
		} else if (event?.messages?.message?.extendedTextMessage?.text) {
			isReplyingToMyMessage = true;
			messageFromUser = event?.messages?.message?.extendedTextMessage?.text;
			messageWhichIsGettingRepliedTo = event?.messages?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation;
			logger(`this is reply to the bot previous message ${messageWhichIsGettingRepliedTo}, reply ${messageFromUser} `)
		}
		const reply = await generateReply(messageFromUser, {isReplyingToMyMessage, messageWhichIsGettingRepliedTo});
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
