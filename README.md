# Meesho Design Studio 🎨

A creative web platform where users can sketch outfit ideas, generate AI-powered dress designs, and share them with the community. Built for the **Meesho ScriptedByHer 2025** hackathon.

## ✨ Features

- **Sketch & Design**: Intuitive HTML5 canvas with Fabric.js for drawing
- **AI Generation**: Transform sketches into stunning dress designs (mock implementation)
- **Community**: Share designs, get likes, and comment on others' work
- **Gamification**: Points system and leaderboard to encourage engagement
- **Responsive Design**: Beautiful UI that works on desktop and mobile
- **Firebase Integration**: Authentication and Firestore database

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd meesho-design-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase** (Optional for demo)
   - Create a Firebase project
   - Enable Authentication and Firestore
   - Update `src/firebase/config.ts` with your Firebase config

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom Meesho theme
- **Canvas**: Fabric.js for drawing functionality
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Backend**: Firebase (Auth + Firestore)
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Layout.tsx      # Main layout with navigation
├── contexts/           # React contexts
│   └── AuthContext.tsx # Firebase authentication
├── firebase/           # Firebase configuration
│   └── config.ts       # Firebase setup
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Sketch.tsx      # Drawing canvas
│   ├── GeneratedDesign.tsx # AI design display
│   ├── Profile.tsx     # User profile
│   └── Leaderboard.tsx # Top users
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🎨 Pages Overview

### 1. Home Page (`/`)
- Welcome message and call-to-action
- Feature highlights
- Community stats
- Leaderboard preview

### 2. Sketch Page (`/sketch`)
- HTML5 canvas with drawing tools
- Color palette and brush size options
- Clear, Save, and Generate AI Design buttons
- Instructions for users

### 3. Generated Design Page (`/design/:id`)
- Display AI-generated dress image
- Like and comment functionality
- Design details and metadata
- Related designs section

### 4. Profile Page (`/profile`)
- User statistics and achievements
- Recent designs gallery
- Points and ranking display

### 5. Leaderboard Page (`/leaderboard`)
- Top users based on points
- User avatars and stats
- How to earn points guide

## 🎯 Key Features

### Drawing Canvas
- **Fabric.js Integration**: Professional drawing experience
- **Color Palette**: 8 predefined colors
- **Brush Sizes**: 4 different brush sizes (2px, 5px, 10px, 15px)
- **Real-time Drawing**: Smooth drawing experience

### AI Generation (Mock)
- Simulates AI processing with loading animation
- Navigates to generated design page
- In production, would integrate with actual AI service

### Community Features
- **Likes System**: Like/unlike designs
- **Comments**: Add and view comments
- **Points System**: Earn points for engagement
- **Leaderboard**: Competitive ranking system

### Responsive Design
- Mobile-first approach
- Beautiful Meesho-style color scheme
- Smooth animations and transitions

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable Authentication (Email/Password + Google)
3. Enable Firestore Database
4. Update `src/firebase/config.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
}
```

## 🚀 Deployment

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

### Vercel/Netlify
- Connect your repository
- Build command: `npm run build`
- Output directory: `dist`

## 🎨 Customization

### Colors
The app uses a custom Meesho color palette defined in `tailwind.config.js`:

```javascript
colors: {
  meesho: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    accent: '#45B7D1',
    yellow: '#FFE66D',
    purple: '#A8E6CF',
    pink: '#FF8B94',
    orange: '#FFA07A',
    light: '#F8F9FA',
    dark: '#2C3E50'
  }
}
```

### Adding New Features
- **New Pages**: Add routes in `App.tsx`
- **Components**: Create in `src/components/`
- **Styling**: Use Tailwind classes or add to `index.css`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is created for the Meesho ScriptedByHer 2025 hackathon.

## 🙏 Acknowledgments

- **Meesho** for the hackathon opportunity
- **Fabric.js** for the canvas functionality
- **Tailwind CSS** for the beautiful styling
- **Firebase** for the backend infrastructure

---

**Built with ❤️ for Meesho ScriptedByHer 2025** 