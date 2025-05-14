import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genai = new GoogleGenAI({
	apiKey: GEMINI_API_KEY,
});

const generateReply = async (message) => {
	const prompt = await getPrompt(message);
	const response = await genai.models.generateContent({
		model: "gemini-2.0-flash",
		contents: prompt,
	});
    let responseParsed;
    let string = response.text;
    string = string.replace(/```json\n/, '').replace(/\n```\n/, '');
    try {
        responseParsed = JSON.parse(string);
    } catch (error) {
        responseParsed = string;
        console.log(error);
    }
	console.log(responseParsed.reply || responseParsed);
	return responseParsed.reply || responseParsed;
};

const getPrompt = async (message) => {
	const prompt = `
    You are a helpful assistant.
    You are given a message from a user.
    The Message is: ${message}
    You need to generate a reply to the message.
    Send the reply back in a striginied JSON format Which can be parsed into a JSON object, the resposne should not start with json and should not end with anything that doesn't allow me to parse it. where it will only contain one field and that will be reply and it will contain the reply u gnenerated
    `;
	return prompt;
};

export default generateReply;
