# My Workspace — Local Team Workspace

**My Workspace** is an original local team workspace application inspired by familiar team-chat design patterns and publicly visible Slack UI behavior. Built with custom branding, original assets, and zero external runtime dependencies, it runs entirely offline on your local machine using standard web technologies.

---

## 🎨 Visual Identity & Architecture

- **Distinct Branding:** Original "My Workspace" geometric logo and cohesive visual theme.
- **Deep Purple Sidebar Navigation:** Signature `#3F0E40` navigation bar with responsive hover states, channel groupings, status indicators, and collapsible views.
- **Clean Slate Chat Canvas:** High-contrast, legible message feed with formatted Markdown, code blocks, blockquotes, and avatar styling.
- **Local-First Storage:** State (conversations, channels, uploaded files, notes, reactions, and threads) persists in browser `localStorage` (`my_workspace_state_v1`).

---

## 🚀 Core Features

### 1. Channels & Direct Messages
- **Pre-populated Channels:** `#general`, `#engineering`, `#product-design`, `#random`.
- **Channel Creation Modal:** Create public or private channels with automatic slug sanitization and duplicate name validation.
- **Direct Messages:** Pre-configured with realistic team members (Sarah Chen, Marcus Vance, Elena Rostova, and Dev Bot) with online status badges (🟢 Active, 🟡 Away).

### 2. Rich Messaging & Reactions
- **Message Composer:** Supports formatting (Bold, Italic, Strikethrough, Code blocks, Lists), attachments, and emoji shortcuts.
- **Interactive Reactions:** Emoji picker supporting common reactions (`👍`, `❤️`, `🚀`, `🎉`, `🔥`, `👀`, `💡`, `👏`, `💯`). Clicking reaction badges toggles reaction counts in real time.

### 3. Threaded Discussions
- Slide-out thread drawer on the right side.
- View parent message, full reply timeline, individual reaction badges, and dedicated thread input box.

### 4. File Attachments & Files Tab
- **In-Chat File Attachments:** Attach real local files via the paperclip button with image previews and document cards.
- **Dedicated Files Repository Tab:** Browse all files shared across channels. Filter by **All Files**, **Images**, **Documents**, and **Code & JSON**.

### 5. Notes & Team Canvas
- Interactive Markdown-enabled collaborative notebook.
- Pre-populated with team roadmaps, token specifications, and deployment runbooks.
- Create new notes, edit titles and content with real-time auto-saving.

### 6. Huddle Room (Simulated Real-Time Audio)
- Immersive dark-mode room inspired by modern team huddle interfaces.
- **Animated Audio Visualizer:** Dynamic HTML5 Canvas waveform responding to microphone activity.
- **Participant Grid:** Live speaking indicators, mute state badges, and camera placeholders.
- **Interactive Controls:** Mic Mute/Unmute toggle, Video toggle, Screen Share simulator, and floating Emoji reaction bursts (`🎉`, `🔥`, `🚀`).

---

## ⚠️ Mocked Features Disclosure

In accordance with prototype standards:
- **No Real Multiuser Connectivity:** All peer messages, online presences, and automated alerts are pre-populated simulations stored locally in browser storage.
- **Local Huddle Audio:** Audio waveforms and speaking states are simulated animations for UX validation; no external WebRTC or voice server is connected.
- **Original Assets:** All icons, SVGs, and CSS rules are written from scratch without proprietary third-party code or assets.

---

## 🧪 Automated Verification & Testing

A complete automated unit test suite verifies all key interactions:
```powershell
node test-suite.js
```

### Verified Test Cases (29/29 Passed):
- [x] Initial store loading and channel/message integrity
- [x] Channel creation, sanitization, and duplicate rejection
- [x] Message sending with timestamps and formatting
- [x] File attachment processing and auto-cataloging in Files tab
- [x] Thread reply creation and parent reply counts
- [x] Emoji reaction toggling (add and remove)
- [x] Global search engine across messages, threads, files, and notes
- [x] Notes creation, editing, and markdown persistence
- [x] Huddle state toggling (microphone, video, and screen sharing)

---

## 💻 Quick Start & Running the App

### Option 1: Open Directly in Your Browser (No Server Needed)
Double-click [index.html](file:///C:/Users/InChrist/.gemini/antigravity/scratch/my-workspace/index.html) or open it with Microsoft Edge / Google Chrome:
```powershell
Start-Process "C:\Users\InChrist\.gemini\antigravity\scratch\my-workspace\index.html"
```

### Option 2: Run via Local HTTP Server
```powershell
cd C:\Users\InChrist\.gemini\antigravity\scratch\my-workspace
npx serve .
```
Open **http://localhost:3000** in your browser.
