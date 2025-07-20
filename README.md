# 🎨 Meesho Design Studio

**Meesho Design Studio** is a fashion tech web app where users can sketch outfits, describe them in text, and generate AI-powered fashion designs in real time using Replicate’s Stable Diffusion.

Built during the **Meesho ScriptedByHer 2025 MVP phase**, this platform blends creativity with cutting-edge AI to empower grassroots designers.

---

## 🔗 Live Demo

👉 [Try the App](https://neon-muffin-4eb379.netlify.app/)

Use **Demo Mode** for instant access — no login required.

---

## ✨ Features

| Feature                        | Description |
|-------------------------------|-------------|
| 🖌️ Freehand Sketch Tool        | Create outfit concepts using a Paint-like canvas via Fabric.js |
| 💬 Custom Text Prompts         | Describe outfits in natural language to guide AI |
| 🔁 Real-time AI Generation     | Sketch + prompt sent to Replicate’s Stable Diffusion to generate design |
| 🔍 Side-by-Side Preview        | Compare user sketch with the AI-generated image |
| 🧪 Demo Mode                   | Try features instantly without signing in |
| 🔐 Firebase Authentication     | Secure sign-in for personalized experience |
| 💾 Save Sketches               | Store designs for future access |
| 🏆 Static Leaderboard          | Displays top designers (demo version) |
| ❤️ Likes & Comments (Static)   | Placeholder UI for community interaction |
| 🤖 Future AI Enhancements      | AI toggle panel for experimental tools |

---

## 🚀 Tech Stack

| Layer         | Tools & Frameworks                      |
|---------------|------------------------------------------|
| Frontend      | React, TypeScript, Vite, Tailwind CSS    |
| Canvas Engine | Fabric.js                                |
| AI API        | Replicate (Stable Diffusion)             |
| Auth & Backend| Firebase Authentication, Firestore (optional) |
| Hosting       | Netlify                                  |
📸 Screenshots
<img width="320" height="275" alt="image" src="https://github.com/user-attachments/assets/23c5b5b2-52c5-403f-b82c-a262667906cf" />


Sketch Canvas

<img width="393" height="344" alt="image" src="https://github.com/user-attachments/assets/dcf2c698-902f-4c3f-aee1-efa9211f9cd7" />

Text Prompt Input

<img width="704" height="556" alt="image" src="https://github.com/user-attachments/assets/81a192cc-ca9f-4778-883d-5aafec223c35" />

Result Preview
---

## 🧪 Run Locally — Setup Guide

```bash
# 1. Clone the repository
git clone https://github.com/niharikakodvanti/meesho-design-studio.git
cd meesho-design-studio

# 2. Install dependencies
npm install

# 3. Create .env file with:
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_REPLICATE_API_TOKEN=your_replicate_token

# 4. Start the dev server
npm run dev

# 5. Open in browser
http://localhost:3000
🗂 Folder Structure (Overview)

src/
├── assets/               # Images, icons
├── components/           # Reusable components
├── Pages/
│   ├── Home/             # Home & demo login
│   ├── Sketch/           # Drawing + prompt input
│   ├── Result/           # AI result + sketch preview
│   ├── Leaderboard/      # Static leaderboard
├── utils/                # API functions, helpers
├── App.tsx               # App routes and layout
├── firebaseConfig.ts     # Firebase setup
🧠 How It Works
User signs in (or continues as guest)

Sketches design on canvas

Enters fashion prompt (e.g. “red lehenga with gold embroidery”)

AI generates a realistic fashion image

User can save, preview, and engage with leaderboard

Future scope includes real-time sharing and community feedback




🔮 Future Scope
🔄 Real-time leaderboard and feedback via Firestore

💬 Live likes, comments, and community wall

📥 Download/share generated designs

🧠 Multiple AI model integration (e.g., SDXL, DALL·E 3)

🛍️ Marketplace integration for creators
