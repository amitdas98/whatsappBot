import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
import logger from "../utils/logger.js";
import { createTranscript } from "../utils/utils.js";
const genai = new GoogleGenAI({
	apiKey: GEMINI_API_KEY,
});

const generateReply = async (message, options) => {
	const prompt = await getPrompt(message, options);
	const response = await genai.models.generateContent({
		model: "gemini-2.0-flash",
		contents: prompt,
	});
	let responseParsed;
	let string = response.text;
	string = string.replace(/```json\n/, "").replace(/\n```\n/, "");
	try {
		responseParsed = JSON.parse(string);
	} catch (error) {
		responseParsed = string;
		logger("error in parsing response", error);
	}
	logger("responseParsed", responseParsed.reply || responseParsed);
	return responseParsed.reply || responseParsed;
};

const getPrompt = async (message, options) => {
	const { messages } = options;
	const transcript = await createTranscript(messages);
	const prompt = `
	You are a helpful assistant.
	You are given a message and a transcript of the conversation.
	You need to reply to the message based on the transcript.
	Transcript History:
	${transcript}
	This has been the conversation between the user and the assistant.
	You are the BOT. You need to reply to the message based on the transcript.
	Last Message from the user: ${message}
	Instructions:
	1. You need to reply to the message based on the transcript.
	2. You need to use the same language as the user.
	3. You need to use the same tone as the user.
	4. you need to just send the reply in a normal text format. JUST THE REPLY, NOTHING ELSE.
	5. You need to be friendly and engaging.
	6. You need to be helpful and informative.
	7. You need to be professional and courteous.
	8. You need to be concise and to the point.
	9. You need to be clear and concise.
	10. You need to be polite and respectful.
	`;
	return prompt;
};

export default generateReply;
