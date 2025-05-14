import sendMessage from "./waSenderAPI.js";
import generateReply from "./gemini.js";

const replyToMessage = async (event) => {
	try {
		console.log("🔔 Message received! Need to reply to the message");
		let senderJid = event?.messages?.key?.remoteJid;
		if (senderJid.includes("@s.whatsapp.net")) {
			senderJid = senderJid.replace("@s.whatsapp.net", "");
		}
		if (!senderJid.includes("+")) {
			senderJid = `+${senderJid}`;
		}
		const messageFromUser = event?.messages?.message?.conversation;
		const reply = await generateReply(messageFromUser);
		console.log(
			`🔔 Reply for message ${messageFromUser} is ${reply} for user ${senderJid}`
		);
		const response = await sendMessage(senderJid, reply);
		console.log("🔔 Response from waSenderAPI", response);
	} catch (error) {
		console.log("🔔 Error in replyToMessage", error);
	}
};

export default replyToMessage;
