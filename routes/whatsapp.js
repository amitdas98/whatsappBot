import { Router } from "express";
import { whatsapp } from "../db/mongo.js";
import replyToMessage from "../controller/whatsappReply.js";
const router = Router();

router.post("/webhook", async (req, res) => {
	try {
		console.log("🔔 Webhook received!");
		console.log("Headers:", req.headers);
		console.log("Body:", req.body);
		const document = {
			event: req?.body?.event,
			sessionId: req?.body?.sessionId,
			data: req?.body?.data,
			timestamp: new Date(req?.body?.timestamp || Date.now()),
		};
		await whatsapp.create(document);

		if (req?.body?.event === "messages.upsert" ) {
            let isFromMe = req?.body?.data?.messages?.key?.fromMe; 
            if (!isFromMe) {
                replyToMessage(req?.body?.data);
            }
			console.log("🔔 Message received! Need to reply to the message");
		}
		// Respond to the webhook sender
		res.status(200).send("Webhook received");
	} catch (error) {
		console.log(`error in webhook`, error);
	}
});

router.get("/whastappMessages", async (req, res) => {
	try {
		const query = req.body || {};
		const response = await whatsapp.find(query);
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({
			message: "Failed to fetch messages",
			error: error?.message,
		});
		console.log(`error in getting messages`, error);
	}
});

export default router;
