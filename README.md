🎨 Meesho Design Studio
Meesho Design Studio is a cutting-edge fashion design web platform where users can sketch freehand, add text-based prompts, and generate AI-powered fashion outfit designs in real-time using Stable Diffusion by Replicate. This project was developed during the Meesho ScriptedByHer 2025 MVP phase.

🔗 Live Demo
Try the project live here: Live Site Link
(https://neon-muffin-4eb379.netlify.app/)

✨ Key Features
Feature	Description
🖌️ Freehand Sketch Tool	Users can sketch their design ideas using an intuitive canvas powered by Fabric.js, similar to Paint.
💬 Custom Text Prompts	Users can describe the kind of outfit they want to generate — the prompt feeds directly into the AI model.
🔁 Real-time AI Generation	Sketch + text prompt are sent to Replicate’s Stable Diffusion model to generate fashion designs.
🔍 Side-by-Side Comparison	Compare your original sketch with the AI-generated fashion outfit visually.
🧪 Demo Mode	Try out the app without signing in using the "Try Demo" option on the homepage.
🔐 Firebase Authentication	Users can securely sign in and save their progress.
💾 Sketch Saving	Save and review your artwork sketches.
🔥 Leaderboard (Static)	Displays a mock leaderboard of top designs — planned for dynamic upgrades.
❤️ Likes and Comments (Static)	Basic UI for engagement metrics — scope for Firebase-backed interactivity.
🤖 AI Advancement Toggle	An experimental feature section for upcoming advanced image editing models.

🚀 Tech Stack
Layer	Technologies Used
Frontend	React + TypeScript, Tailwind CSS, Fabric.js
Backend/API	Replicate (Stable Diffusion)
Auth & Storage	Firebase Authentication, Firestore (optional for future data)
Deployment	Netlify
Build Tool	Vite

🧪 Demo Credentials
Use Demo Mode on the homepage to try the app without signing in.

🗂️ Folder Structure (Brief)
bash
Copy
Edit
src/
├── assets/               # Images, icons
├── components/           # Reusable React components
├── Pages/
│   ├── Home/             # Home page with intro & demo login
│   ├── Sketch/           # Drawing canvas + prompt + generate
│   ├── Result/           # AI image + sketch comparison
│   ├── Leaderboard/      # Static leaderboard
├── utils/                # Helper functions (e.g., API calls)
├── App.tsx               # Main app with routing
├── firebaseConfig.ts     # Firebase auth setup
🧠 How It Works
User Signs In / Starts Demo
Users can log in with Firebase Auth or use demo mode.

Sketch on Canvas
Fabric.js canvas lets users draw basic design sketches.

Enter a Prompt
e.g., “red gown with lace detailing and flare sleeves”

Generate with AI
The sketch + text prompt are sent to the Stable Diffusion model hosted on Replicate.

Preview & Save
The resulting AI fashion image is shown alongside the sketch.

View Leaderboard & Likes
Hardcoded leaderboard to showcase "popular" designs (will be dynamic later).

Future Scope
Add real-time likes, comments, sharing, and multiple design generations.

📸 Screenshots (Optional)
<img width="320" height="275" alt="image" src="https://github.com/user-attachments/assets/373e4204-cbf9-4107-937e-2424fc024d57" />
<img width="393" height="344" alt="image" src="https://github.com/user-attachments/assets/96bb06d6-b4b4-4697-a105-48c24c506a81" />
<img width="704" height="556" alt="image" src="https://github.com/user-attachments/assets/d5a80e5f-25ba-484d-9bd7-87000f50095d" />


🛠️ Future Improvements
 Add real-time Firestore-based leaderboard

 Enable likes/comments using Firebase

 Enable sketch download/share

 Add multiple model support (e.g., SDXL, DALLE-3)

 Improve prompt processing and result fidelity

🙋‍♀️ Created By
K.V.L. Niharika
For Meesho ScriptedByHer 2025



## 🧪 Demo Credentials
Use demo mode on the homepage for instant preview.

---

Created as part of Meesho ScriptedByHer 2025 MVP phase 💜
