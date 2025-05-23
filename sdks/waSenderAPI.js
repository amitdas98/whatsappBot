import { createWasender } from "wasenderapi";
// For Node.js < 18 or environments without global fetch, you might need a polyfill


const apiKey = process.env.WASENDER_API_KEY; // Session-specific API key
const personalAccessToken = process.env.WASENDER_PERSONAL_ACCESS_TOKEN; // Account-level PAT
const webhookSecret = process.env.WASENDER_WEBHOOK_SECRET; // Required for wasender.handleWebhookEvent()

// Optional: Configure retry behavior for rate limit errors
const retryOptions = {
  enabled: true,
  maxRetries: 3, // Attempt up to 3 retries on HTTP 429 errors
};

const wasender = createWasender(
  apiKey, // Can be undefined if only using PAT
  personalAccessToken, // Can be undefined if only using session-specific apiKey
  undefined, // Optional: baseUrl, defaults to "https://www.wasenderapi.com/api"
  undefined, // Optional: customFetch implementation (e.g., for Node.js < 18)
  retryOptions,
);

export default wasender;