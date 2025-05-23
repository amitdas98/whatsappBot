const logger = (message, data) => {
    const timestamp = new Date().toISOString();
    console.log(`UTC: ${timestamp} BDT: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })} - ${message}`, data || "");
}

export default logger;