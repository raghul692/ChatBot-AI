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
