# AI Agent - Modern Chat Interface

A sleek, modern chat interface built with React and Tailwind CSS, featuring a futuristic design similar to ChatGPT.

## Features

- **Modern UI/UX**: Clean, futuristic design with smooth animations
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Responsive Design**: Perfect on both desktop and mobile devices
- **Real-time Chat**: Interactive chat with simulated AI responses
- **Smooth Animations**: Fade-in messages, hover effects, and loading animations
- **Mobile-First**: Collapsible sidebar with overlay for mobile users
- **Auto-scroll**: Automatically scrolls to new messages
- **Multiline Input**: Support for multiline messages with auto-resize

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── ChatArea.js          # Main chat messages display
│   ├── LoadingAnimation.js  # Typing dots animation
│   ├── Message.js           # Individual message component
│   ├── MessageInput.js      # Input area with send button
│   ├── MobileToggle.js      # Mobile hamburger menu
│   ├── Sidebar.js           # Left sidebar with settings
│   └── TopNavigation.js     # Top navigation bar
├── contexts/
│   ├── ChatContext.js       # Chat state management
│   └── ThemeContext.js      # Theme state management
├── App.js                   # Main app component
├── index.js                 # React entry point
└── index.css               # Global styles and Tailwind imports
```

## Technologies Used

- **React 18** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management
- **CSS Animations** - Custom animations and transitions

## Customization

### Theme Colors
Modify the color scheme in `tailwind.config.js` and the component files.

### AI Responses
Update the response array in `src/contexts/ChatContext.js` to customize AI responses.

### Animations
Customize animations in `tailwind.config.js` and `src/index.css`.

## License

This project is open source and available under the [MIT License](LICENSE).


