import { whatsappConversation } from "../db/mongo.js";

const createMessage = async (data) => {
  const newMessage = new whatsappConversation(data);
  await newMessage.save();
  return newMessage;
};

const getMessages = async (uid) => {
  const messages = await whatsappConversation.find({uid: uid}).sort({_id: -1}).lean();
  return messages;
};

export { createMessage, getMessages };
