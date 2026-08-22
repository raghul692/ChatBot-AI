# Architecture & Technical Specification

## 1. Directory Structure

```text
AI_ChatBot/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppHeader.tsx
│   │   │   ├── LeftSidebar.tsx
│   │   │   ├── RightArtifactPanel.tsx
│   │   │   └── ResizableHandle.tsx
│   │   ├── chat/
│   │   │   ├── ChatComposer.tsx
│   │   │   ├── ChatMessageStream.tsx
│   │   │   ├── CitationCard.tsx
│   │   │   ├── ModeSelectorChips.tsx
│   │   │   └── PromptSuggestions.tsx
│   │   ├── artifacts/
│   │   │   ├── DocumentViewer.tsx
│   │   │   ├── DataAnalystWorkspace.tsx
│   │   │   ├── CodeWorkspace.tsx
│   │   │   ├── FlashcardsViewer.tsx
│   │   │   ├── QuizViewer.tsx
│   │   │   ├── ResearchCanvas.tsx
│   │   │   └── VisionAnalysisViewer.tsx
│   │   ├── knowledge/
│   │   │   ├── FilesLibrary.tsx
│   │   │   ├── UploadCenterModal.tsx
│   │   │   ├── ProcessingQueue.tsx
│   │   │   └── KnowledgeBaseView.tsx
│   │   ├── settings/
│   │   │   ├── ProfileSettings.tsx
│   │   │   ├── PreferencesSettings.tsx
│   │   │   ├── AppearanceSettings.tsx
│   │   │   ├── StorageSettings.tsx
│   │   │   └── SecuritySettings.tsx
│   │   ├── auth/
│   │   │   ├── LandingPage.tsx
│   │   │   ├── AuthModal.tsx
│   │   │   └── PasswordResetModal.tsx
│   │   └── modals/
│   │       ├── GlobalSearchModal.tsx
│   │       ├── ShareConversationModal.tsx
│   │       ├── ExportCenterModal.tsx
│   │       └── DeleteAccountModal.tsx
│   ├── types/
│   │   └── index.ts
│   ├── context/
│   │   └── WorkspaceContext.tsx
│   ├── mockData/
│   │   └── workspaceData.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── DESIGN_SYSTEM.md
├── PRODUCT_ANALYSIS.md
├── ARCHITECTURE.md
├── package.json
└── vite.config.ts
```

---

## 2. State Management Architecture
- **`WorkspaceContext`**: Central React context managing active mode, selected screen/view, panel open/close states, active conversation messages, document page index, flashcard index, quiz score, search query, theme mode, and language mode.

---

## 3. Screen Routing & State Mapping
All 36 screen contexts defined in `PRODUCT_ANALYSIS.md` are dynamically switchable within the global shell via a quick-navigation menu or command palette (`Cmd+K`).
