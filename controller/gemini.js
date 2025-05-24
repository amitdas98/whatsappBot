import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
import logger from "../utils/logger.js";
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
  const { isReplyingToMyMessage, messageWhichIsGettingRepliedTo } = options;
  if (isReplyingToMyMessage && messageWhichIsGettingRepliedTo) {
    const prompt = `
    You are a helpful assistant.
    You are given a message from a user.
    User is replying to your message.
    You previous message was: ${messageWhichIsGettingRepliedTo}
    The Reply Message is: ${message}
    You need to generate a reply to the message.
    Just send reply in the response, nothing else. `;
    return prompt;
  }
  const prompt = `
    You are a helpful assistant.
    You are given a message from a user.
    The Message is: ${message}
    You need to generate a reply to the message.
    Send the reply back in a striginied JSON format Which can be parsed into a JSON object, 
    Just send reply in the response, nothing else.`;
  return prompt;
};

export default generateReply;
