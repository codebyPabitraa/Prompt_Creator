# ⚡ PromptCraft

**Transform your raw ideas into engineered perfection.**

PromptCraft is a sleek, modern web application designed to bridge the gap between human concepts and AI-optimized prompts. Built with speed and precision in mind, it leverages the **Groq API** and **Llama 3.3** to deliver instant, high-quality prompt engineering.

![PromptCraft Preview](https://img.shields.io/badge/UI-Modern_Dark-blueviolet?style=for-the-badge)
![API](https://img.shields.io/badge/Powered_by-Groq_AI-orange?style=for-the-badge)
![Node](https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge)

---

## ✨ Features

- 🚀 **Lightning Fast**: Powered by Groq's ultra-low latency inference engine.
- 🎨 **Beautiful UI**: A premium dark-themed interface with smooth transitions and glassmorphism.
- 📂 **Smart Categories**: Tailor your prompts for Coding, Marketing, Writing, Analysis, and more.
- 🕒 **History Tracking**: Keep track of your recent generations during your session.
- 📋 **One-Click Copy**: Instantly copy your engineered prompt to use in ChatGPT, Claude, or Midjourney.
- ⌨️ **Power User Shortcuts**: Press `Ctrl + Enter` to generate prompts instantly.

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML5, CSS3 (Custom Variables, Flexbox/Grid), and JavaScript (ES6+).
- **Backend**: Node.js with Express.
- **AI Engine**: Groq SDK / API (Llama-3.3-70b-versatile).
- **Security**: Rate-limiting and environment variable protection.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A [Groq Cloud API Key](https://console.groq.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/codebyPabitraa/Prompt_Creator.git
   cd Prompt_Creator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   PORT=3000
   ```

4. **Launch the application:**
   ```bash
   node server.js
   ```
   Open `http://localhost:3000` in your browser.

---

## 📖 Usage

1. **Select a Category**: Choose the context for your prompt (e.g., "Marketing").
2. **Input Idea**: Describe what you want to achieve in plain language.
3. **Generate**: Click the button or hit `Ctrl + Enter`.
4. **Copy & Use**: Your optimized prompt is ready for any AI model!

---

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by [Pabitra](https://github.com/codebyPabitraa)