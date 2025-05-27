const MESSAGE_STATUS = {
	0: "ERROR",
	1: "PENDING",
	2: "SENT",
	3: "DELIVERED",
	4: "READ",
	5: "PLAYED",
};

const createTranscript = async (messages) => {
	let transcript = "";
	if (messages.length > 0) {
		for (const message of messages) {
			transcript += `${message.messageType}: ${message.message}\n`;
		}
	}
	return transcript;
};

export { MESSAGE_STATUS, createTranscript };
