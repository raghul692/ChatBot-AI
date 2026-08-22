# 🌌 Aetheris AI — Multimodal Intelligence & Interactive Workspace Platform

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-API_Live-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![Oxlint](https://img.shields.io/badge/Linter-Oxlint_Passed-000000)](https://oxc.rs/)

> **Aetheris AI** is a state-of-the-art, high-craft Multimodal AI Research Platform and Workspace designed for power users, developers, researchers, and data analysts. Built with React 19, TypeScript, and Vite, Aetheris seamlessly connects live streaming LLM responses (Google Gemini 2.5 Flash / 2.0 Flash) with dynamic interactive artifact workspaces.

---

## 🌟 Key Features & Highlights

### 💬 1. Intelligent Multimodal Chat Stream
- **Live Google Gemini Integration**: Stream real-time answers with customizable model hyperparameters (Temperature & Max Output Tokens).
- **Speech Synthesis (Text-to-Speech)**: Read answers aloud with multi-language voice support (English, தமிழ், Tanglish).
- **Smart Fallback Engine**: Seamless response generation even without an active API key configured.
- **Confidence Scoring & Verified Citations**: Includes source page references, confidence metrics, and interactive citation cards.

### 🎨 2. Dual-Panel Interactive Artifact Workspaces
- **📄 Document Viewer & Citation Reader**: Searchable PDF/whitepaper reader with page turners, inline text selection, and citation tracking.
- **📊 Data Analyst Workspace**: Real-time data grid, dynamic Recharts visualizations (Bar, Line, Pie, Area), CSV exporter, and filter tools.
- **💻 IDE & Multi-Language Code Compiler**: Live code editor supporting **JavaScript (ES6+)**, **Python (3.11)**, **React (JSX Live Render)**, **HTML5 Web Preview**, **CSS3 Sandbox**, **Java (21 JVM)**, **C (GCC)**, and **SQL Query Batch Execution**.
- **🎴 3D Interactive Flashcards & Quiz Engine**: Animated 3D flip flashcards, multiple-choice quizzes with live scoring, answer feedback, and confetti celebration animations.
- **🧭 Research Canvas**: Visual graph node map, step-by-step reasoning tree, and hypothesis testing canvas.
- **👁️ Multimodal Vision Analysis**: Bounding-box detection overlay, object detection breakdown, and OCR text extraction viewer.

### 📚 3. Knowledge Base & Document Processing Queue
- Ingest and index custom documents, PDFs, datasets, and codebase whitepapers.
- Live processing status, file metadata breakdown, vector embedding simulation, and deletion tools.

### ⚙️ 4. Executive Settings Suite & Profile Management
- **User Profile Management**: Personal identity, job title, company, custom avatar image uploader with base64 storage, and JSON profile exporter.
- **API Key Configuration**: Secure local storage management for Google Gemini API key (`VITE_GEMINI_API_KEY`).
- **Appearance & Multilingual Mode**: Instant toggle between Dark/Light glassmorphism themes and language modes (English, Tamil, Tanglish).
- **Storage & Security**: Vector storage quota monitor and one-click account/data purge option.

### ⚡ 5. Power User Command Center & Global Modals
- **Command Palette (`Cmd+K` / `Ctrl+K`)**: Rapidly search across 36 workspace screens, documents, diffs, and settings.
- **Share & Export Center**: Export conversations in JSON/Markdown format or share links with single-click clipboard copying.

---

## 🏗️ Architecture & Project Structure

```text
AI_ChatBot/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/            # Shell Header, Left Navigation Sidebar, Right Artifact Panel
│   │   ├── chat/              # Chat Stream, Prompt Composer, Citations, Mode Chips
│   │   ├── artifacts/         # Document, Code IDE, Data Grid, Flashcards, Quiz, Vision, Canvas
│   │   ├── knowledge/         # Knowledge Base Library, Upload Modal, Processing Queue
│   │   ├── settings/          # Profile Settings, API Keys, Theme & Appearance
│   │   ├── auth/              # Landing Page, Authentication & Reset Modals
│   │   └── modals/            # Command Palette Search, Share, Export, Account Delete
│   ├── context/
│   │   └── WorkspaceContext.tsx # Central React State Management & Screen Router
│   ├── services/
│   │   └── geminiApi.ts       # Google Gemini SDK Integration & Streaming Handler
│   ├── mockData/
│   │   └── workspaceData.ts   # Presets for Documents, Datasets, Flashcards & Code
│   ├── types/                 # TypeScript Types & Interfaces
│   ├── App.tsx                # Main Application Entry Point
│   └── index.css              # Custom Tailwind CSS v4 Design Tokens & Animations
├── ARCHITECTURE.md            # Technical Architecture Specifications
├── DESIGN_SYSTEM.md          # Design System Tokens & Aesthetic Guidelines
├── PRODUCT_ANALYSIS.md        # Screen Matrix & Product Specifications
├── package.json
└── vite.config.ts
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### 1. Clone & Install Dependencies
```bash
cd AI_ChatBot
npm install
```

### 2. Configure Environment (Optional)
Create a `.env` file in the root directory if you wish to set a default Google Gemini API key:
```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
```
> *Note: You can also enter or update your Gemini API key anytime directly inside the application under **Settings -> AI Preferences**.*

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```

### 5. Linting & Code Verification
```bash
npm run lint
```

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Core** | React 19, TypeScript 6.0, Vite 8.2 |
| **Styling & Design** | Tailwind CSS v4, Lucide React, Google Material Symbols, Custom Glassmorphism CSS |
| **AI Integration** | `@google/genai` (Gemini Live Stream API), Web Speech API |
| **Visualizations** | Recharts 3.x, Canvas Confetti |
| **Quality Control** | Oxlint (0 Warnings, 0 Errors) |

---

# Product Analysis: Aetheris AI — Multimodal AI Workspace

## Executive Summary
Aetheris AI is a next-generation, high-cognition multimodal AI workspace designed for knowledge workers, researchers, developers, students, and data analysts. Unlike conventional linear chat interfaces, Aetheris AI uses an **Adaptive Three-Zone Workspace Architecture** (Left Navigation & Context, Center Conversation & Primary Interaction, Right Contextual Artifact Viewer).

---

## 1. User Personas & Use Cases

### Persona 1: Dr. Aris Thorne (Research Scientist & Academic)
- **Need:** Ingesting heavy research papers, cross-referencing citations, analyzing methodologies, and compiling structured notes.
- **Workflow:** Uploads PDFs to Knowledge Base → Uses Document Intelligence & Research Canvas → Leverages Citation Surfacing to verify source page numbers.

### Persona 2: Maya Lin (Senior Data Analyst)
- **Need:** Interrogating large CSVs/SQL databases, generating chart visualisations, and formulating analytical narratives.
- **Workflow:** Ingests datasets → Uses Chat + Data Analyst mode → Filters data tables inline and reviews Recharts visualisations in the Right Panel.

### Persona 3: Alex Chen (Full-Stack Software Engineer)
- **Need:** Code generation, debugging, refactoring, and reviewing side-by-side code diffs.
- **Workflow:** Prompts code generation → Opens Code Artifact panel → Toggles Code/Preview/Diff tabs → Runs code simulation.

### Persona 4: Kavin & Priya (Students & Multilingual Learners)
- **Need:** Studying complex subjects, generating flashcards and practice quizzes, switching seamlessly between English, Tamil, and Thanglish.
- **Workflow:** Uploads study material → Uses Study Dashboard → Practices Flashcards & MCQs with real-time feedback.

---

## 2. Information Architecture & Screen Directory (36 Screens)

| # | Screen Title | Category | Primary Zone | Core Key Feature |
|---|--------------|----------|--------------|-------------------|
| 01 | Landing Page | Auth/Marketing | Main Canvas | Product vision, feature showcase, hero CTA |
| 02 | Sign Up Workspace | Auth | Modal/Center | Account creation, OAuth, terms |
| 03 | Login Workspace | Auth | Modal/Center | User authentication, remember me, magic link |
| 04 | Forgot Password Workspace | Auth | Modal/Center | Password recovery trigger & feedback |
| 05 | Reset Password Workspace | Auth | Modal/Center | Password strength meter & password reset |
| 06 | New Chat Workspace | Core AI | Adaptive Shell | Intent discovery, prompt templates, mode chips |
| 07 | Active Conversation Workspace | Core AI | Adaptive Shell | Multi-turn streaming chat, message actions |
| 08 | Chat + Document Intelligence | Context AI | 3-Panel Split | PDF viewer, page jump, inline text citations |
| 09 | Chat + Data Analysis Workspace | Context AI | 3-Panel Split | Interactive CSV grid, Recharts charts, SQL preview |
| 10 | Chat + Coding Workspace | Context AI | 3-Panel Split | Syntax highlighted editor, Code/Diff/Preview tabs |
| 11 | Chat + Study Workspace | Context AI | 3-Panel Split | Interactive Flashcards & MCQ Quiz panel |
| 12 | Full Multimodal Workspace | Context AI | 3-Panel Split | Dense power-user view with resizable panels |
| 13 | Files Library Workspace | Knowledge | Center/Table | File listing, tag filtering, metadata inspector |
| 14 | Upload Center Workspace | Knowledge | Modal/Center | Drag & drop ingestion zone, file type validator |
| 15 | Processing Center Workspace | Knowledge | Center/Queue | Real-time vectorization & OCR status progress |
| 16 | Knowledge Base Dashboard | Knowledge | Center/Grid | Collection management, document indexing |
| 17 | Knowledge Base Detail Workspace | Knowledge | Center/Detail | Collection document browser & chunk preview |
| 18 | AI Mode Selection Workspace | AI Modes | Modal/Picker | Mode switcher (General, Research, Data, Code, Study) |
| 19 | Study Dashboard Workspace | AI Modes | Center/Grid | Deck overview, study streak, quiz analytics |
| 20 | Flashcards Workspace | AI Modes | Artifact Panel | 3D Flip flashcards with confidence self-rating |
| 21 | AI Quiz / MCQ Workspace | AI Modes | Artifact Panel | Interactive practice test with immediate scoring |
| 22 | Data Analyst Dashboard | AI Modes | Center/Grid | Quick metrics, dataset manager, chart templates |
| 23 | Data Analysis Workspace Detail | AI Modes | Artifact Panel | Full-screen tabular data editor & SQL console |
| 24 | Coding Workspace Detail | AI Modes | Center/Split | Full IDE view with console output & live preview |
| 25 | Research Workspace | AI Modes | 3-Panel Split | Web search sources, citation map, synthesis |
| 26 | Document Intelligence Detail | AI Modes | Artifact Panel | OCR layer inspector & entity extraction view |
| 27 | Vision Analysis Workspace | AI Modes | Center/Split | Image upload with bounding boxes & visual QA |
| 28 | User Profile Workspace | Account | Settings Shell | User avatar, account details, active sessions |
| 29 | AI Preferences Workspace | Account | Settings Shell | Temperature, default model, system prompt editor |
| 30 | Appearance & Language Workspace | Account | Settings Shell | Dark/Light mode, English/Tamil/Thanglish font controls |
| 31 | Storage Management Workspace | Account | Settings Shell | Quota visualizer, cloud connector, cleanup tool |
| 32 | Security & Privacy Workspace | Account | Settings Shell | 2FA setup, data retention policies, audit log |
| 33 | Delete Account Confirmation | Account | Modal/Warning | Destructive action verification dialog |
| 34 | Share Conversation Workspace | Utilities | Modal | Public link generator, permission toggles |
| 35 | Export Center Workspace | Utilities | Modal | PDF, Markdown, JSON, HTML export builder |
| 36 | Global Search Workspace | Utilities | Cmd+K Overlay | Instant search across chats, files, and code |

---

## 3. Multimodal & Multilingual Architecture

- **Multimodal Inputs:** Text, PDF/Word documents, CSV/Excel data tables, Images (PNG/JPG), Code snippets.
- **Multilingual Support:** Native English, Noto Sans Tamil, and informal Thanglish script parsing.
- **Confidence Surfacing:** Every AI citation renders source details, confidence badges, page numbers, and interactive hover cards.

# Design System Specification: Aetheris AI Design Tokens & Standard

## 1. Visual Philosophy
Aetheris AI adopts a **sleek, dark-first enterprise aesthetic** defined by high visual density, precise structural borders, controlled contrast, and subtle micro-interactions.

---

## 2. Design Tokens

### Color Palette

#### Dark Mode (Default)
- `--bg-root`: `#09090b` (Zinc-950)
- `--bg-surface`: `#18181b` (Zinc-900)
- `--bg-surface-hover`: `#27272a` (Zinc-800)
- `--bg-surface-active`: `#3f3f46` (Zinc-700)
- `--border-subtle`: `#27272a` (Zinc-800)
- `--border-focus`: `#818cf8` (Indigo-400)
- `--text-primary`: `#fafafa` (Zinc-50)
- `--text-secondary`: `#a1a1aa` (Zinc-400)
- `--text-muted`: `#71717a` (Zinc-500)
- `--accent-primary`: `#818cf8` (Indigo-400)
- `--accent-glow`: `rgba(129, 140, 248, 0.15)`
- `--success`: `#4ade80` (Emerald-400)
- `--warning`: `#fbbf24` (Amber-400)
- `--error`: `#f87171` (Red-400)

#### Light Mode
- `--bg-root`: `#ffffff`
- `--bg-surface`: `#f4f4f5` (Zinc-100)
- `--bg-surface-hover`: `#e4e4e7` (Zinc-200)
- `--bg-surface-active`: `#d4d4d8` (Zinc-300)
- `--border-subtle`: `#e4e4e7` (Zinc-200)
- `--border-focus`: `#6366f1` (Indigo-500)
- `--text-primary`: `#18181b` (Zinc-900)
- `--text-secondary`: `#71717a` (Zinc-500)
- `--text-muted`: `#a1a1aa` (Zinc-400)
- `--accent-primary`: `#6366f1` (Indigo-500)
- `--accent-glow`: `rgba(99, 102, 241, 0.15)`
- `--success`: `#22c55e`
- `--warning`: `#f59e0b`
- `--error`: `#ef4444`

---

## 3. Typography Rules
- **Primary UI Font:** `'Inter'`, sans-serif
- **Tamil Font:** `'Noto Sans Tamil'`, sans-serif (line-height: `1.6`)
- **Code & Data Font:** `'JetBrains Mono'`, monospace

---

## 4. Layout Tokens & Grid

- **Global Header Height:** `52px`
- **Left Panel Width:** `260px` (Collapsible to `64px`)
- **Right Panel Width:** `420px` (Resizable up to `680px`)
- **Border Radius Scale:**
  - `sm`: `6px`
  - `md`: `8px`
  - `lg`: `12px`
  - `xl`: `16px`
- **Spacing Scale:** `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`

## 👤 Author & Credits

- **Developer**: Raghul Raja M
- **Role**: Lead AI System Architect & Full Stack Engineer
- **Platform**: Aetheris Intelligence Labs

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
