# AutiCare: Interactive Learning Platform

**AutiCare** is a gamified, interactive web-based educational platform designed to provide a supportive and engaging digital learning environment. Built using React and Tailwind CSS, AutiCare offers a progressive system of mini-games focused on developing cognitive skills, emotional recognition, vocabulary, and mathematics.

## 🌟 Key Features

### 1. Progressive Learning System
Activities are structured into three distinct tiers, encouraging continuous learning and improvement through a rewarding progression system:
- **Level 1 (Beginner):** Focuses on foundational skills like emotional recognition (*Emoji Match*) and visual identification (*Color Match*).
- **Level 2 (Intermediate):** Unlocked by mastering beginner games. Challenges include vocabulary building (*Word Scramble*) and basic arithmetic (*Math Magic*).
- **Level 3 (Advanced):** The ultimate test featuring *Science Quiz*, logic-based *Puzzle Adventure*, and *Geography Explorer*. Users must achieve high scores in Level 2 to unlock these games.

### 2. Engaging Interactive Mini-Games
AutiCare moves away from traditional learning by integrating education into fun, interactive modules that provide immediate visual feedback, keeping learners engaged and motivated.

### 3. Real-time Progress Tracking & Rewards
The platform includes built-in state management context that monitors user interactions across all activities. It tracks total games played, active milestones, and high scores, translating these into a rewarding visual experience for the user.

### 4. Modern, Accessible Design
- **Visual Appeal:** The UI is designed to be bright, friendly, and highly visual, utilizing playful typography, soft gradients, and custom micro-animations to create a premium feel.
- **Responsiveness:** Fully responsive design ensures the platform is accessible and enjoyable across desktop, tablet, and mobile devices.

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** React 18 (using Vite for fast HMR and optimized builds)
- **Routing:** React Router DOM (v7) for seamless single-page application navigation between the dashboard, activities, and individual games.
- **State Management:** React Context API (`GameStatsContext`) for global tracking of scores and progression.
- **Styling:** Tailwind CSS combined with custom CSS for rapid, modern UI development and rich aesthetics (including custom animations and dynamic hover states).
- **Icons & Graphics:** Inline SVG icons and curated visual assets to ensure fast loading times and crisp rendering.

## 🚀 Getting Started Locally

To run this project on your local machine:

1. **Clone the repository** (if you haven't already).
2. **Navigate to the frontend directory:**
   ```bash
   cd react-first
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```
5. Open your browser and visit `http://localhost:5173` (or the port provided by Vite) to explore AutiCare!

<img width="1880" height="908" alt="Screenshot 2026-03-09 232612" src="https://github.com/user-attachments/assets/929edeeb-60a1-4616-a6ae-0ecde697add8" />

<img width="1836" height="909" alt="Screenshot 2026-03-09 232725" src="https://github.com/user-attachments/assets/e0018677-fea3-4769-a14d-c9a4b5f51df9" />

<img width="1421" height="913" alt="Screenshot 2026-03-09 232805" src="https://github.com/user-attachments/assets/435a6743-30fd-4de7-a128-66bab2888839" />


