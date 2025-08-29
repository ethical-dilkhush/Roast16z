# Webhook Test Instructions

## How to Test if Webhook is Working:

### 1. Open Browser Developer Tools
- Press `F12` or right-click → "Inspect"
- Go to **Console** tab

### 2. Send a Test Message
- Type any message in the chat input
- Press Enter to send

### 3. Check Console Output
Look for these log messages:
```
🔍 Current chat ID being sent: [chat-id]
🔍 Webhook data being sent: {chatId: "...", message: "...", ...}
Webhook response: [response-data]
```

### 4. Expected Behavior
- ✅ **Success**: You see webhook logs and get AI response
- ❌ **Failure**: You see error messages or no webhook logs

### 5. Common Issues
- **"Webhook URL not configured"** → .env file missing
- **"Failed to fetch"** → CORS or network issue
- **No logs at all** → Environment variables not loaded

### 6. Quick Verification
Check if environment variables are loaded:
```javascript
// In browser console, type:
console.log('Webhook URL:', process.env.REACT_APP_WEBHOOK_URL);
```

---
**Note**: Delete this file after testing
