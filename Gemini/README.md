# Gemini AI Chatbot Integration

A modular, easy-to-integrate AI chatbot powered by Google Gemini for your VPS Siêu Tốc website.

## Features

- 🤖 Powered by Google Gemini AI
- 🎨 Modern, responsive design with neon theme
- 📱 Mobile-friendly interface
- ⚡ Easy one-line integration
- 🔧 Customizable and removable
- 💬 Context-aware conversations about VPS services
- 🌟 Floating toggle button with animations

## Quick Setup

### 1. Get Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create a new project or select existing one
3. Generate an API key
4. Copy the API key

### 2. Configure the Chatbot

1. Open `Gemini/chatbot.js`
2. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key:
   ```javascript
   this.apiKey = 'your-actual-api-key-here';
   ```

### 3. Add to Your Website

Add this single line to your HTML file (preferably before the closing `</body>` tag):

```html
<script src="./Gemini/gemini-chatbot.js"></script>
```

That's it! The chatbot will automatically appear on your website.

## Usage Examples

### Basic Integration
```html
<!DOCTYPE html>
<html>
<head>
    <title>Your Website</title>
</head>
<body>
    <!-- Your website content -->
    
    <!-- Add this line to include the chatbot -->
    <script src="./Gemini/gemini-chatbot.js"></script>
</body>
</html>
```

### Remove Chatbot
To remove the chatbot, simply delete the script line from your HTML or use JavaScript:
```javascript
window.GeminiChatbot.remove();
```

### Reload Chatbot
To reload the chatbot:
```javascript
window.GeminiChatbot.reload();
```

## File Structure

```
Gemini/
├── gemini-chatbot.js      # Main integration script (use this in your HTML)
├── chatbot.html           # Chatbot HTML structure
├── chatbot.css            # Chatbot styles
├── chatbot.js             # Chatbot functionality and API integration
└── README.md              # This file
```

## Customization

### Styling
Edit `chatbot.css` to customize colors, sizes, and animations. The current theme uses:
- Primary color: `#39FF14` (neon green)
- Background: `#121212` (dark)
- Cards: `#1a1a1a` (darker)

### Context/Personality
Edit the `initializeContext()` method in `chatbot.js` to modify the AI's knowledge base and personality.

### API Configuration
Modify the `callGeminiAPI()` method in `chatbot.js` to adjust:
- Temperature (creativity)
- Response length
- Safety settings

## Troubleshooting

### Common Issues

1. **Chatbot doesn't appear**
   - Check if the file paths are correct
   - Ensure Font Awesome is loaded
   - Check browser console for errors

2. **API not working**
   - Verify your API key is correct
   - Check if you have API quota remaining
   - Ensure your domain is authorized (if restrictions are set)

3. **Styling issues**
   - Check if CSS file is loading properly
   - Verify no CSS conflicts with existing styles

### Error Messages

- `"Để sử dụng trợ lý AI, vui lòng cấu hình API key"` → API key not configured
- `"Xin lỗi, tôi đang gặp sự cố kỹ thuật"` → API call failed (check console)

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Security Notes

- Keep your API key secure
- Consider implementing rate limiting
- Monitor API usage to avoid unexpected charges
- Use environment variables for production deployments

## License

This chatbot integration is provided as-is for VPS Siêu Tốc website integration.
