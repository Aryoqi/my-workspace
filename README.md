# My Workspace — Local & Cloud Team Workspace

**My Workspace** is an original local and cloud-connected team workspace inspired by familiar team-chat design patterns and publicly visible Slack UI behavior. Built with zero build-tool dependencies, it supports offline local prototyping as well as live multi-user real-time team collaboration with free-tier cloud backends.

---

## 🔐 Real Authentication & Multi-User Support

The workspace now features an **Authentication Gate**:
- **Sign In & Create Account:** Supports secure email and password-protected accounts for every team member.
- **Display Names & Custom Avatars:** Users choose their display name and receive a persistent user identity.
- **Session Persistence:** Automatically keeps members signed in using session storage.
- **Demo Mode Bypass:** Allows testing the application instantly in local offline mode without logging in.

---

## ☁️ How to Connect Free Real-Time Cloud (Supabase)

You can connect a 100% free cloud backend in under 2 minutes so your team members can sign up and chat live across any computer or mobile device:

### Step 1: Create a Free Project on Supabase
1. Go to **[supabase.com](https://supabase.com)** and sign in (or create a free account).
2. Click **New Project**, choose a name (e.g. `my-workspace`), and set a database password.
3. The free tier includes **50,000 active users**, 500 MB database, and **real-time WebSocket sync** at $0.

### Step 2: Run the Database Setup Script
1. In your Supabase project dashboard, click **SQL Editor** on the left menu.
2. Click **New query**, open [schema.sql](file:///C:/Users/InChrist/.gemini/antigravity/scratch/my-workspace/schema.sql), copy its contents, paste them into the SQL editor, and click **Run**.
3. This creates all tables (`channels`, `messages`, `thread_replies`), sets Row Level Security, and enables real-time message broadcasting.

### Step 3: Link Your Credentials in the App
1. In Supabase, go to **Project Settings** &rarr; **API**.
2. Copy your **Project URL** and public **`anon` key**.
3. In **My Workspace**, click your profile at the bottom-left of the sidebar &rarr; **Connect Cloud Backend** (or open the settings icon).
4. Paste the URL and key, and click **Save & Connect**.

Now when any team member signs up with their password, their messages and channels sync live across the entire team in real time!

---

## 🎨 Visual Identity & Architecture

- **Signature Purple Sidebar:** Deep `#3F0E40` navigation bar with responsive hover states, channel groupings, unread badges, and status indicator dots.
- **Conversations Feed:** Clean chat feed with formatted Markdown, code blocks, attachments, and reaction badges.
- **Interactive Reactions:** Emoji picker supporting common reactions (`👍`, `❤️`, `🚀`, `🎉`, `🔥`, `👀`, `💡`, `👏`, `💯`).
- **Threaded Discussions:** Slide-out thread drawer for focused side conversations.
- **Files Repository:** Central repository organizing all shared files across channels with category filters (**All**, **Images**, **Documents**, **Code & JSON**).
- **Notes Canvas:** Interactive collaborative notebook with auto-saving.
- **Huddle Room:** Simulated real-time room with dynamic HTML5 Canvas audio wave animations, speaking states, and screen sharing.

---

## 🧪 Automated Verification & Testing

Run the automated test suite anytime:
```powershell
node test-suite.js
```
*(29/29 tests passing).*

---

## 🚀 How to Run Locally

Double-click [index.html](file:///C:/Users/InChrist/.gemini/antigravity/scratch/my-workspace/index.html) or run in PowerShell:
```powershell
Start-Process "C:\Users\InChrist\.gemini\antigravity\scratch\my-workspace\index.html"
```
Or start a local static server:
```powershell
cd C:\Users\InChrist\.gemini\antigravity\scratch\my-workspace
npx serve .
```
