# Gemini Chatbot Setup Instructions

## API Key Security Setup

### Option 1: Using Config File (Recommended for local development)

1. Copy the template file:
   ```bash
   copy Gemini\config.template.js Gemini\config.js
   ```

2. Edit `Gemini/config.js` and replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key:
   ```javascript
   window.GEMINI_CONFIG = {
       apiKey: 'your-actual-api-key-here'
   };
   ```

3. The `config.js` file is already in `.gitignore` so it won't be committed to git.

### Option 2: Using Browser localStorage

1. The first time you use the chatbot, it will prompt you to enter your API key
2. The key will be stored in your browser's localStorage
3. You can clear it anytime by running in browser console: `localStorage.removeItem('gemini_api_key')`

### Option 3: Environment Variables (For production deployment)

Set the environment variable `GEMINI_API_KEY` in your hosting environment.

## File Structure After Setup

```
Gemini/
├── config.template.js     # Template file (safe to commit)
├── config.js             # Your actual config (DO NOT COMMIT)
├── gemini-chatbot.js     # Main integration script
├── chatbot.html          # Chatbot HTML
├── chatbot.css           # Chatbot styles
├── chatbot.js            # Chatbot functionality
└── README.md             # Documentation
```

## Important Security Notes

✅ **Safe to commit:**
- `config.template.js`
- All other files in the Gemini folder

❌ **NEVER commit:**
- `config.js` (contains your API key)
- `.env` files
- Any file with actual API keys

## Git Commands

```bash
# Check what files will be committed
git status

# Add all files except ignored ones
git add .

# Commit your changes
git commit -m "Add Gemini chatbot integration"

# Push to repository
git push
```

The `.gitignore` file will automatically prevent sensitive files from being committed.
