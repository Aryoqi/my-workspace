/**
 * My Workspace - Local Team Workspace Engine
 * Manages state, channels, messages, threads, reactions, files, notes, and huddle simulation.
 */

// -----------------------------------------------------------------------------
// Sample Initial Data
// -----------------------------------------------------------------------------
const DEFAULT_WORKSPACE_DATA = {
  currentUser: {
    id: "u_me",
    name: "Alex Morgan",
    role: "Senior Product Engineer",
    avatarColor: "#611f69",
    status: "active",
    statusText: "Building My Workspace 🚀"
  },
  users: [
    { id: "u_sarah", name: "Sarah Chen", role: "Design Lead", status: "active", avatarColor: "#1264a3", initial: "SC" },
    { id: "u_marcus", name: "Marcus Vance", role: "Backend Architect", status: "away", avatarColor: "#2eb67d", initial: "MV" },
    { id: "u_elena", name: "Elena Rostova", role: "Frontend Dev", status: "active", avatarColor: "#e01e5a", initial: "ER" },
    { id: "u_devbot", name: "Dev Bot", role: "CI/CD & System Alerts", status: "active", isBot: true, avatarColor: "#ecb22e", initial: "DB" }
  ],
  channels: [
    {
      id: "c_general",
      name: "general",
      topic: "Company announcements, all-hands discussions, and high-level updates.",
      isPrivate: false,
      membersCount: 16
    },
    {
      id: "c_engineering",
      name: "engineering",
      topic: "Architecture RFCs, sprint syncs, code review requests, and CI/CD status.",
      isPrivate: false,
      membersCount: 9
    },
    {
      id: "c_product_design",
      name: "product-design",
      topic: "Figma specs, design system tokens, usability studies, and UI feedback.",
      isPrivate: false,
      membersCount: 7
    },
    {
      id: "c_random",
      name: "random",
      topic: "Non-work banter, coffee recommendations, pet pictures, and playlists.",
      isPrivate: false,
      membersCount: 20
    }
  ],
  messages: [
    // General Channel Messages
    {
      id: "m_1",
      conversationId: "c_general",
      conversationType: "channel",
      authorId: "u_sarah",
      authorName: "Sarah Chen",
      authorAvatar: "#1264a3",
      timestamp: "Today at 9:15 AM",
      text: "Good morning team! Welcome to the new **My Workspace** local prototype. Take a look around the channels, test threaded replies, and check out the new Notes canvas.",
      reactions: { "👋": ["u_me", "u_marcus", "u_elena"], "🚀": ["u_me", "u_sarah"] },
      replies: [
        {
          id: "r_1_1",
          authorId: "u_marcus",
          authorName: "Marcus Vance",
          authorAvatar: "#2eb67d",
          timestamp: "Today at 9:18 AM",
          text: "Looking slick! The aubergine sidebar navigation feels right at home.",
          reactions: { "💯": ["u_sarah"] }
        },
        {
          id: "r_1_2",
          authorId: "u_elena",
          authorName: "Elena Rostova",
          authorAvatar: "#e01e5a",
          timestamp: "Today at 9:22 AM",
          text: "Loving the snappy thread drawer! I'm reviewing the design tokens right now.",
          reactions: { "❤️": ["u_sarah", "u_me"] }
        }
      ]
    },
    {
      id: "m_2",
      conversationId: "c_general",
      conversationType: "channel",
      authorId: "u_devbot",
      authorName: "Dev Bot",
      isBot: true,
      authorAvatar: "#ecb22e",
      timestamp: "Today at 9:30 AM",
      text: "🟢 **Deployment Alert**: Workspace v1.0.4-rc successfully deployed to local environment.\n- Test suite: `38 passed, 0 failed`\n- Build artifacts: `bundle-main.js (210kb gzip)`",
      reactions: { "🎉": ["u_me", "u_sarah", "u_marcus"] },
      replies: []
    },

    // Engineering Channel Messages
    {
      id: "m_3",
      conversationId: "c_engineering",
      conversationType: "channel",
      authorId: "u_marcus",
      authorName: "Marcus Vance",
      authorAvatar: "#2eb67d",
      timestamp: "Today at 10:05 AM",
      text: "Here is the architectural overview diagram for the local storage event pipeline. Let me know if the caching strategy looks solid before we freeze the spec.",
      attachment: {
        id: "att_1",
        name: "architecture-pipeline-v2.svg",
        size: "42 KB",
        type: "image",
        url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='160' viewBox='0 0 400 160'><rect width='400' height='160' fill='%231E232B' rx='8'/><rect x='20' y='50' width='90' height='60' rx='6' fill='%231264A3'/><text x='65' y='85' fill='white' font-family='sans-serif' font-size='12' text-anchor='middle'>Client UI</text><path d='M115 80 L160 80' stroke='%232EB67D' stroke-width='2' marker-end='url(%23arrow)'/><rect x='165' y='50' width='100' height='60' rx='6' fill='%234A154B'/><text x='215' y='85' fill='white' font-family='sans-serif' font-size='12' text-anchor='middle'>Local Storage</text><path d='M270 80 L315 80' stroke='%232EB67D' stroke-width='2'/><rect x='320' y='50' width='60' height='60' rx='6' fill='%23ECB22E'/><text x='350' y='85' fill='black' font-family='sans-serif' font-size='12' text-anchor='middle'>Cache</text></svg>"
      },
      reactions: { "👀": ["u_elena", "u_me"], "🔥": ["u_me"] },
      replies: [
        {
          id: "r_3_1",
          authorId: "u_elena",
          authorName: "Elena Rostova",
          authorAvatar: "#e01e5a",
          timestamp: "Today at 10:12 AM",
          text: "Looks clean! The local cache layer will prevent any layout thrashing on channel switch.",
          reactions: {}
        }
      ]
    },
    {
      id: "m_4",
      conversationId: "c_engineering",
      conversationType: "channel",
      authorId: "u_elena",
      authorName: "Elena Rostova",
      authorAvatar: "#e01e5a",
      timestamp: "Today at 10:45 AM",
      text: "Quick reminder: all search indexing runs client-side with instant token matching so there's zero lag when jumping across channels. Try typing `/` or clicking the top search bar!",
      reactions: { "💡": ["u_marcus", "u_sarah", "u_me"] },
      replies: []
    },

    // Product Design Messages
    {
      id: "m_5",
      conversationId: "c_product_design",
      conversationType: "channel",
      authorId: "u_sarah",
      authorName: "Sarah Chen",
      authorAvatar: "#1264a3",
      timestamp: "Today at 11:10 AM",
      text: "I've finalized the token guidelines in the **Notes tab**! Check out the typography and elevation tokens. Feel free to leave comments in this thread.",
      attachment: {
        id: "att_2",
        name: "design-system-tokens.json",
        size: "18 KB",
        type: "document"
      },
      reactions: { "🎨": ["u_me", "u_elena"], "👏": ["u_me"] },
      replies: []
    },

    // Random Channel
    {
      id: "m_6",
      conversationId: "c_random",
      conversationType: "channel",
      authorId: "u_marcus",
      authorName: "Marcus Vance",
      authorAvatar: "#2eb67d",
      timestamp: "Today at 11:35 AM",
      text: "Any good lo-fi recommendations for deep work sessions today? Drop your links! 🎧",
      reactions: { "☕": ["u_sarah", "u_elena"] },
      replies: []
    },

    // Direct Messages with Sarah Chen
    {
      id: "m_dm_1",
      conversationId: "u_sarah",
      conversationType: "dm",
      authorId: "u_sarah",
      authorName: "Sarah Chen",
      authorAvatar: "#1264a3",
      timestamp: "Today at 11:50 AM",
      text: "Hey Alex! Whenever you have 5 minutes, hop into the **Huddle Room** from the top right button. We can test the simulated mic visualizer and screen share view together.",
      reactions: { "👍": ["u_me"] },
      replies: []
    }
  ],

  files: [
    {
      id: "f_1",
      name: "architecture-pipeline-v2.svg",
      type: "image",
      size: "42 KB",
      uploader: "Marcus Vance",
      channel: "engineering",
      date: "Today at 10:05 AM",
      previewUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='160' viewBox='0 0 400 160'><rect width='400' height='160' fill='%231E232B' rx='8'/><rect x='20' y='50' width='90' height='60' rx='6' fill='%231264A3'/><text x='65' y='85' fill='white' font-family='sans-serif' font-size='12' text-anchor='middle'>Client UI</text><path d='M115 80 L160 80' stroke='%232EB67D' stroke-width='2'/><rect x='165' y='50' width='100' height='60' rx='6' fill='%234A154B'/><text x='215' y='85' fill='white' font-family='sans-serif' font-size='12' text-anchor='middle'>Local Storage</text><path d='M270 80 L315 80' stroke='%232EB67D' stroke-width='2'/><rect x='320' y='50' width='60' height='60' rx='6' fill='%23ECB22E'/><text x='350' y='85' fill='black' font-family='sans-serif' font-size='12' text-anchor='middle'>Cache</text></svg>"
    },
    {
      id: "f_2",
      name: "design-system-tokens.json",
      type: "code",
      size: "18 KB",
      uploader: "Sarah Chen",
      channel: "product-design",
      date: "Today at 11:10 AM"
    },
    {
      id: "f_3",
      name: "Q4_Engineering_Roadmap.pdf",
      type: "document",
      size: "1.4 MB",
      uploader: "Alex Morgan",
      channel: "general",
      date: "Yesterday at 4:20 PM"
    },
    {
      id: "f_4",
      name: "sprint-24-retrospective.md",
      type: "document",
      size: "8 KB",
      uploader: "Elena Rostova",
      channel: "engineering",
      date: "Nov 20, 2026"
    }
  ],

  notes: [
    {
      id: "n_1",
      title: "🚀 Q4 Engineering Objectives",
      updatedAt: "Today at 10:30 AM",
      content: `# Q4 Engineering Objectives\n\n## 1. Local Workspace Foundation\n- [x] Responsive layout with persistent navigation sidebar\n- [x] Channel creation and direct message support\n- [x] Real-time message composition with attachments\n- [x] Interactive threaded discussions and emoji reactions\n\n## 2. Collaboration Tooling\n- [x] Instant search across conversation histories\n- [x] Dedicated Files repository\n- [x] Interactive Notes / Canvas editor\n- [x] Simulated audio/video Huddle room\n\n## 3. Reliability & Offline Support\n- [x] Zero-dependency localStorage persistence\n- [x] Instant search query indexing`
    },
    {
      id: "n_2",
      title: "📐 Design System Color & Token Specs",
      updatedAt: "Yesterday at 3:15 PM",
      content: `# Design System Color & Token Specs\n\n### Primary Palette\n- **Sidebar Aubergine**: \`#3F0E40\` (Deep workspace violet)\n- **Active Nav Accent**: \`#1164A3\` (High contrast focus)\n- **Canvas Background**: \`#FFFFFF\` (Clean slate read area)\n\n### Status Accents\n- **Active / Online**: \`#2EB67D\` (Emerald green)\n- **Away / Busy**: \`#ECB22E\` (Amber yellow)\n- **Destructive / Alert**: \`#E01E5A\` (Berry red)`
    },
    {
      id: "n_3",
      title: "⚡ Local Storage Architecture & Caching",
      updatedAt: "Nov 19, 2026",
      content: `# Local Storage Architecture & Caching\n\nAll state changes (channels, messages, replies, notes, uploaded files) are persisted to the \`my_workspace_state\` key in browser storage.\n\n### Data Flow\n1. User action dispatches store update\n2. In-memory state syncs\n3. Storage serializer executes debounced persistence\n4. Reactive DOM listeners update view`
    }
  ]
};

// -----------------------------------------------------------------------------
// State Store
// -----------------------------------------------------------------------------
class WorkspaceStore {
  constructor() {
    this.STORAGE_KEY = "my_workspace_state_v1";
    this.loadState();
    this.activeConversationId = "c_general";
    this.activeConversationType = "channel";
    this.currentView = "chat"; // 'chat', 'files', 'notes', 'huddle'
    this.activeThreadMessageId = null;
    this.activeNoteId = this.data.notes[0]?.id || null;
    this.huddleState = {
      inHuddle: false,
      isMuted: false,
      isVideoOn: false,
      isScreenSharing: false,
      activeChannelId: "c_general"
    };
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        this.data = JSON.parse(saved);
      } else {
        this.data = JSON.parse(JSON.stringify(DEFAULT_WORKSPACE_DATA));
        this.saveState();
      }
    } catch (e) {
      console.warn("Could not load from localStorage, using defaults", e);
      this.data = JSON.parse(JSON.stringify(DEFAULT_WORKSPACE_DATA));
    }
  }

  saveState() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error("Failed to save state to localStorage", e);
    }
  }

  resetToDefaults() {
    this.data = JSON.parse(JSON.stringify(DEFAULT_WORKSPACE_DATA));
    this.activeConversationId = "c_general";
    this.activeConversationType = "channel";
    this.activeThreadMessageId = null;
    this.currentView = "chat";
    this.saveState();
  }

  // Conversation Helpers
  getActiveConversation() {
    if (this.activeConversationType === "channel") {
      return this.data.channels.find(c => c.id === this.activeConversationId) || this.data.channels[0];
    } else {
      return this.data.users.find(u => u.id === this.activeConversationId) || this.data.users[0];
    }
  }

  getMessagesForActiveConversation() {
    return this.data.messages.filter(m => m.conversationId === this.activeConversationId);
  }

  // Actions
  addChannel(name, topic, isPrivate = false) {
    const cleanName = name.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9_-]/g, "");
    if (!cleanName) return null;
    
    // Check if channel name already exists
    if (this.data.channels.some(c => c.name === cleanName)) {
      if (typeof alert !== 'undefined') alert("A channel with that name already exists.");
      return null;
    }

    const newChannel = {
      id: "c_" + Date.now(),
      name: cleanName,
      topic: topic.trim() || "No topic set.",
      isPrivate: !!isPrivate,
      membersCount: 1
    };

    this.data.channels.push(newChannel);
    this.saveState();
    return newChannel;
  }

  sendMessage(text, attachment = null) {
    if (!text.trim() && !attachment) return null;

    const activeConv = this.getActiveConversation();
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const timeStr = `Today at ${formattedHours}:${minutes} ${ampm}`;

    const newMessage = {
      id: "m_" + Date.now(),
      conversationId: this.activeConversationId,
      conversationType: this.activeConversationType,
      authorId: this.data.currentUser.id,
      authorName: this.data.currentUser.name,
      authorAvatar: this.data.currentUser.avatarColor,
      timestamp: timeStr,
      text: text.trim(),
      attachment: attachment || null,
      reactions: {},
      replies: []
    };

    this.data.messages.push(newMessage);

    // If attachment present, register in files catalog
    if (attachment) {
      this.data.files.unshift({
        id: "f_" + Date.now(),
        name: attachment.name,
        type: attachment.type || "document",
        size: attachment.size || "100 KB",
        uploader: this.data.currentUser.name,
        channel: activeConv.name || "DM",
        date: timeStr,
        previewUrl: attachment.url || null
      });
    }

    this.saveState();
    return newMessage;
  }

  addThreadReply(parentMessageId, text) {
    if (!text.trim()) return null;

    const parentMsg = this.data.messages.find(m => m.id === parentMessageId);
    if (!parentMsg) return null;

    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    const reply = {
      id: "r_" + Date.now(),
      authorId: this.data.currentUser.id,
      authorName: this.data.currentUser.name,
      authorAvatar: this.data.currentUser.avatarColor,
      timestamp: `Today at ${formattedHours}:${minutes} ${ampm}`,
      text: text.trim(),
      reactions: {}
    };

    if (!parentMsg.replies) parentMsg.replies = [];
    parentMsg.replies.push(reply);
    this.saveState();
    return reply;
  }

  toggleReaction(messageId, emoji, isReply = false, replyId = null) {
    const parentMsg = this.data.messages.find(m => m.id === messageId);
    if (!parentMsg) return;

    let target = parentMsg;
    if (isReply && replyId) {
      target = parentMsg.replies?.find(r => r.id === replyId);
      if (!target) return;
    }

    if (!target.reactions) target.reactions = {};

    const userId = this.data.currentUser.id;
    if (!target.reactions[emoji]) {
      target.reactions[emoji] = [userId];
    } else {
      const idx = target.reactions[emoji].indexOf(userId);
      if (idx > -1) {
        target.reactions[emoji].splice(idx, 1);
        if (target.reactions[emoji].length === 0) {
          delete target.reactions[emoji];
        }
      } else {
        target.reactions[emoji].push(userId);
      }
    }

    this.saveState();
  }

  // Notes Management
  createNote(title = "Untitled Note") {
    const newNote = {
      id: "n_" + Date.now(),
      title: title,
      updatedAt: "Just now",
      content: `# ${title}\n\nStart typing team notes here...`
    };
    this.data.notes.unshift(newNote);
    this.activeNoteId = newNote.id;
    this.saveState();
    return newNote;
  }

  updateNote(id, title, content) {
    const note = this.data.notes.find(n => n.id === id);
    if (!note) return;
    note.title = title;
    note.content = content;
    note.updatedAt = "Just now";
    this.saveState();
  }

  // Search Engine
  search(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results = [];

    // Search messages
    this.data.messages.forEach(msg => {
      if (msg.text.toLowerCase().includes(q)) {
        let locationName = "";
        if (msg.conversationType === "channel") {
          const ch = this.data.channels.find(c => c.id === msg.conversationId);
          locationName = ch ? `#${ch.name}` : "Channel";
        } else {
          const u = this.data.users.find(u => u.id === msg.conversationId);
          locationName = u ? `@${u.name}` : "Direct Message";
        }

        results.push({
          type: "message",
          title: `${msg.authorName} in ${locationName}`,
          snippet: msg.text,
          date: msg.timestamp,
          conversationId: msg.conversationId,
          conversationType: msg.conversationType,
          messageId: msg.id
        });
      }

      // Search in replies
      msg.replies?.forEach(reply => {
        if (reply.text.toLowerCase().includes(q)) {
          results.push({
            type: "thread_reply",
            title: `Reply from ${reply.authorName}`,
            snippet: reply.text,
            date: reply.timestamp,
            conversationId: msg.conversationId,
            conversationType: msg.conversationType,
            messageId: msg.id
          });
        }
      });
    });

    // Search Files
    this.data.files.forEach(f => {
      if (f.name.toLowerCase().includes(q)) {
        results.push({
          type: "file",
          title: `File: ${f.name}`,
          snippet: `Uploaded by ${f.uploader} in #${f.channel} (${f.size})`,
          date: f.date,
          fileId: f.id
        });
      }
    });

    // Search Notes
    this.data.notes.forEach(n => {
      if (n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)) {
        results.push({
          type: "note",
          title: `Note: ${n.title}`,
          snippet: n.content.slice(0, 100) + "...",
          date: n.updatedAt,
          noteId: n.id
        });
      }
    });

    return results;
  }
}

// Global Store Instance
const store = new WorkspaceStore();

// -----------------------------------------------------------------------------
// UI Renderer
// -----------------------------------------------------------------------------
class WorkspaceUI {
  constructor(store) {
    this.store = store;
    this.huddleAudioAnimFrame = null;
    this.huddleReactionInterval = null;
    this.pendingAttachment = null;
  }

  init() {
    this.bindEvents();
    this.bindAuthEvents();
    this.checkAuth();
    this.renderSidebar();
    this.renderConversation();
    this.renderFiles();
    this.renderNotes();
  }

  // ---------------------------------------------------------------------------
  // Authentication & Cloud Synchronization
  // ---------------------------------------------------------------------------
  async checkAuth() {
    if (typeof window === "undefined" || !window.cloudService) return;

    const user = await window.cloudService.getCurrentSessionUser();
    const overlay = document.getElementById("auth-overlay");

    if (user) {
      if (overlay) overlay.style.display = "none";
      const name = user.user_metadata?.display_name || user.email.split("@")[0];
      const email = user.email;
      this.store.data.currentUser.id = user.id;
      this.store.data.currentUser.name = name;
      this.store.data.currentUser.email = email;
      this.store.data.currentUser.avatarColor = user.user_metadata?.avatar_color || "#4A154B";

      this.updateProfileDisplay(name, email);
      this.syncRemoteData();
    } else {
      // Show auth overlay
      if (overlay) overlay.style.display = "flex";
    }
  }

  updateProfileDisplay(name, email) {
    const nameEl = document.getElementById("current-user-name");
    const statusEl = document.getElementById("current-user-status");
    const avatarEl = document.getElementById("current-user-avatar");
    const popoverName = document.getElementById("popover-user-name");
    const popoverEmail = document.getElementById("popover-user-email");
    const popoverSync = document.getElementById("popover-sync-text");

    if (nameEl) nameEl.textContent = name;
    if (statusEl) statusEl.textContent = email || "Online";
    if (avatarEl) {
      const initial = name.split(" ").map(n => n[0]).join("").toUpperCase();
      avatarEl.textContent = initial || "U";
      avatarEl.style.backgroundColor = this.store.data.currentUser.avatarColor;
    }
    if (popoverName) popoverName.textContent = name;
    if (popoverEmail) popoverEmail.textContent = email;
    if (popoverSync) {
      const isCloud = window.cloudService?.isConnected;
      popoverSync.textContent = isCloud ? "Cloud Sync: Active (Supabase)" : "Local Demo Mode";
    }
  }

  async syncRemoteData() {
    if (!window.cloudService?.isConnected) return;

    // Fetch remote channels
    const remoteChannels = await window.cloudService.fetchChannels();
    if (remoteChannels && remoteChannels.length > 0) {
      remoteChannels.forEach(rc => {
        if (!this.store.data.channels.some(c => c.name === rc.name)) {
          this.store.data.channels.push({
            id: rc.id,
            name: rc.name,
            topic: rc.topic || "",
            isPrivate: rc.is_private || false,
            membersCount: 1
          });
        }
      });
      this.renderSidebar();
    }

    // Subscribe to active channel real-time inserts
    this.setupRealtimeListener();
  }

  setupRealtimeListener() {
    if (!window.cloudService?.isConnected) return;

    window.cloudService.subscribeToChannel(this.store.activeConversationId, (remoteMsg) => {
      // Map remote message to store format
      const exists = this.store.data.messages.some(m => m.id === remoteMsg.id);
      if (!exists) {
        const newMsg = {
          id: remoteMsg.id,
          conversationId: remoteMsg.channel_id,
          conversationType: "channel",
          authorId: remoteMsg.user_id,
          authorName: remoteMsg.user_name,
          authorAvatar: remoteMsg.user_avatar || "#4A154B",
          timestamp: "Just now",
          text: remoteMsg.text,
          attachment: remoteMsg.attachment || null,
          reactions: remoteMsg.reactions || {},
          replies: []
        };
        this.store.data.messages.push(newMsg);
        this.renderConversation();
      }
    });
  }

  bindAuthEvents() {
    const tabSignIn = document.getElementById("tab-sign-in");
    const tabSignUp = document.getElementById("tab-sign-up");
    const nameGroup = document.getElementById("signup-name-group");
    const passwordHint = document.getElementById("password-hint");
    const submitBtn = document.getElementById("auth-submit-btn");
    const authForm = document.getElementById("auth-form");
    const errorAlert = document.getElementById("auth-error-alert");
    const demoLink = document.getElementById("btn-continue-demo");
    const userMenuBtn = document.getElementById("sidebar-footer-btn");
    const userMenuPopover = document.getElementById("user-menu-popover");
    const logoutBtn = document.getElementById("btn-auth-logout");
    const openCloudBtn = document.getElementById("btn-open-cloud-settings");
    const cloudModal = document.getElementById("cloud-modal");
    const cloudCloseBtn = document.getElementById("cloud-modal-close");
    const cloudCancelBtn = document.getElementById("cloud-modal-cancel");
    const cloudForm = document.getElementById("cloud-config-form");

    let isSignUpMode = false;

    if (tabSignIn && tabSignUp) {
      tabSignIn.addEventListener("click", () => {
        isSignUpMode = false;
        tabSignIn.classList.add("active");
        tabSignUp.classList.remove("active");
        if (nameGroup) nameGroup.style.display = "none";
        if (passwordHint) passwordHint.style.display = "none";
        if (submitBtn) submitBtn.textContent = "Sign In";
        if (errorAlert) errorAlert.style.display = "none";
      });

      tabSignUp.addEventListener("click", () => {
        isSignUpMode = true;
        tabSignUp.classList.add("active");
        tabSignIn.classList.remove("active");
        if (nameGroup) nameGroup.style.display = "flex";
        if (passwordHint) passwordHint.style.display = "block";
        if (submitBtn) submitBtn.textContent = "Create Account";
        if (errorAlert) errorAlert.style.display = "none";
      });
    }

    if (authForm) {
      authForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("auth-email")?.value.trim();
        const password = document.getElementById("auth-password")?.value;
        const displayName = document.getElementById("auth-display-name")?.value.trim();

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Please wait...";
        }
        if (errorAlert) errorAlert.style.display = "none";

        let result;
        if (isSignUpMode) {
          result = await window.cloudService.signUp(email, password, displayName);
        } else {
          result = await window.cloudService.signIn(email, password);
        }

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = isSignUpMode ? "Create Account" : "Sign In";
        }

        if (result.error) {
          if (errorAlert) {
            errorAlert.textContent = result.error.message || "Authentication failed. Check your credentials.";
            errorAlert.style.display = "block";
          }
        } else {
          document.getElementById("auth-overlay").style.display = "none";
          this.checkAuth();
        }
      });
    }

    // Demo Mode bypass
    if (demoLink) {
      demoLink.addEventListener("click", () => {
        document.getElementById("auth-overlay").style.display = "none";
        localStorage.setItem("my_workspace_demo_session", JSON.stringify({
          id: "u_demo",
          email: "guest@myworkspace.local",
          user_metadata: { display_name: "Guest Teammate", avatar_color: "#1264A3" }
        }));
        this.checkAuth();
      });
    }

    // User Popover Toggle
    if (userMenuBtn && userMenuPopover) {
      userMenuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        userMenuPopover.classList.toggle("open");
      });
      document.addEventListener("click", (e) => {
        if (!userMenuPopover.contains(e.target) && e.target !== userMenuBtn) {
          userMenuPopover.classList.remove("open");
        }
      });
    }

    // Logout
    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        await window.cloudService.signOut();
        userMenuPopover?.classList.remove("open");
        document.getElementById("auth-overlay").style.display = "flex";
      });
    }

    // Cloud Settings Modal
    if (openCloudBtn && cloudModal) {
      openCloudBtn.addEventListener("click", () => {
        userMenuPopover?.classList.remove("open");
        const urlInput = document.getElementById("cloud-url-input");
        const keyInput = document.getElementById("cloud-key-input");
        if (urlInput) urlInput.value = window.cloudService.config.url || "";
        if (keyInput) keyInput.value = window.cloudService.config.anonKey || "";
        cloudModal.classList.add("open");
      });
    }

    const closeCloudModal = () => cloudModal?.classList.remove("open");
    cloudCloseBtn?.addEventListener("click", closeCloudModal);
    cloudCancelBtn?.addEventListener("click", closeCloudModal);

    if (cloudForm) {
      cloudForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const url = document.getElementById("cloud-url-input")?.value;
        const key = document.getElementById("cloud-key-input")?.value;
        window.cloudService.saveConfig(url, key);
        closeCloudModal();
        alert("Cloud configuration saved! Re-authenticating with your Supabase backend...");
        this.checkAuth();
      });
    }
  }

  // ---------------------------------------------------------------------------
  // Sidebar Rendering
  // ---------------------------------------------------------------------------
  renderSidebar() {
    // Render Channels
    const channelsContainer = document.getElementById("channels-list");
    channelsContainer.innerHTML = "";
    this.store.data.channels.forEach(ch => {
      const el = document.createElement("div");
      el.className = `channel-item ${this.store.activeConversationId === ch.id && this.store.currentView === 'chat' ? 'active' : ''}`;
      el.innerHTML = `
        <div class="channel-name-wrap">
          <span class="channel-prefix">${ch.isPrivate ? '🔒' : '#'}</span>
          <span>${ch.name}</span>
        </div>
      `;
      el.addEventListener("click", () => this.selectConversation(ch.id, "channel"));
      channelsContainer.appendChild(el);
    });

    // Render Direct Messages
    const dmContainer = document.getElementById("dm-list");
    dmContainer.innerHTML = "";
    this.store.data.users.forEach(u => {
      const el = document.createElement("div");
      el.className = `dm-item ${this.store.activeConversationId === u.id && this.store.currentView === 'chat' ? 'active' : ''}`;
      el.innerHTML = `
        <div class="dm-name-wrap">
          <span class="status-dot ${u.status}"></span>
          <span>${u.name}</span>
          ${u.isBot ? '<span class="message-bot-badge">APP</span>' : ''}
        </div>
      `;
      el.addEventListener("click", () => this.selectConversation(u.id, "dm"));
      dmContainer.appendChild(el);
    });

    // Render current user profile info in footer
    const currentUserNameEl = document.getElementById("current-user-name");
    const currentUserStatusEl = document.getElementById("current-user-status");
    const currentUserAvatarEl = document.getElementById("current-user-avatar");
    if (currentUserNameEl) currentUserNameEl.textContent = this.store.data.currentUser.name;
    if (currentUserStatusEl) currentUserStatusEl.textContent = this.store.data.currentUser.statusText;
    if (currentUserAvatarEl) {
      currentUserAvatarEl.style.backgroundColor = this.store.data.currentUser.avatarColor;
      currentUserAvatarEl.textContent = "AM";
    }

    // Active state on top nav items
    document.querySelectorAll(".nav-item").forEach(item => {
      const targetView = item.dataset.view;
      if (targetView && targetView === this.store.currentView) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // ---------------------------------------------------------------------------
  // Conversation & Chat Feed Rendering
  // ---------------------------------------------------------------------------
  selectConversation(id, type) {
    this.store.activeConversationId = id;
    this.store.activeConversationType = type;
    this.store.currentView = "chat";
    this.switchView("chat");
    this.renderSidebar();
    this.renderConversation();
  }

  renderConversation() {
    const activeConv = this.store.getActiveConversation();
    const isChannel = this.store.activeConversationType === "channel";

    // Header info
    const headerTitle = document.getElementById("chat-header-title");
    const headerTopic = document.getElementById("chat-header-topic");
    const huddleChannelName = document.getElementById("huddle-channel-name");

    if (isChannel) {
      headerTitle.innerHTML = `<span style="opacity:0.6;font-size:18px;">#</span> ${activeConv.name}`;
      headerTopic.textContent = activeConv.topic || "No topic set";
      if (huddleChannelName) huddleChannelName.textContent = `#${activeConv.name}`;
    } else {
      headerTitle.innerHTML = `<span class="status-dot ${activeConv.status}" style="margin-right:4px;"></span> ${activeConv.name}`;
      headerTopic.textContent = `${activeConv.role} — Direct Message (Mocked)`;
      if (huddleChannelName) huddleChannelName.textContent = `@${activeConv.name}`;
    }

    // Messages feed
    const container = document.getElementById("messages-container");
    container.innerHTML = "";

    const messages = this.store.getMessagesForActiveConversation();

    if (messages.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding: 60px 20px; color: var(--text-secondary);">
          <div style="font-size: 32px; margin-bottom: 12px;">💬</div>
          <h3 style="font-size: 18px; color: var(--text-primary); margin-bottom: 6px;">This is the start of #${isChannel ? activeConv.name : activeConv.name}</h3>
          <p style="font-size: 13px;">Send a message below to kick off the conversation.</p>
        </div>
      `;
      return;
    }

    // Add Date Divider
    const dateDiv = document.createElement("div");
    dateDiv.className = "date-divider";
    dateDiv.innerHTML = `<span class="date-divider-text">Today</span>`;
    container.appendChild(dateDiv);

    messages.forEach(msg => {
      const card = this.createMessageCardElement(msg);
      container.appendChild(card);
    });

    // Auto-scroll to bottom
    container.scrollTop = container.scrollHeight;

    // Refresh active thread if open
    if (this.store.activeThreadMessageId) {
      this.renderThreadDrawer(this.store.activeThreadMessageId);
    }
  }

  createMessageCardElement(msg, isThreadReply = false) {
    const card = document.createElement("div");
    card.className = "message-card";
    card.id = `msg-${msg.id}`;

    // Get initial
    const initial = msg.authorName.split(" ").map(n => n[0]).join("").toUpperCase();

    // Markdown-like simple rendering
    let formattedText = this.escapeHtml(msg.text)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br/>');

    // Attachment HTML
    let attachmentHtml = "";
    if (msg.attachment) {
      if (msg.attachment.type === "image" && msg.attachment.url) {
        attachmentHtml = `
          <div class="attachment-card">
            <div class="attachment-info">
              <div class="attachment-filename">🖼️ ${this.escapeHtml(msg.attachment.name)}</div>
              <div class="attachment-meta">${msg.attachment.size} • Shared file</div>
              <img src="${msg.attachment.url}" class="attachment-preview-img" alt="Attachment" />
            </div>
          </div>
        `;
      } else {
        attachmentHtml = `
          <div class="attachment-card">
            <div class="attachment-icon">📄</div>
            <div class="attachment-info">
              <div class="attachment-filename">${this.escapeHtml(msg.attachment.name)}</div>
              <div class="attachment-meta">${msg.attachment.size || 'Document'} • Click to view</div>
            </div>
          </div>
        `;
      }
    }

    // Reactions HTML
    let reactionsHtml = "";
    if (msg.reactions && Object.keys(msg.reactions).length > 0) {
      reactionsHtml = `<div class="reactions-row">`;
      for (const [emoji, users] of Object.entries(msg.reactions)) {
        const hasReacted = users.includes(this.store.data.currentUser.id);
        reactionsHtml += `
          <span class="reaction-pill ${hasReacted ? 'reacted' : ''}" data-emoji="${emoji}">
            <span>${emoji}</span>
            <span>${users.length}</span>
          </span>
        `;
      }
      reactionsHtml += `<button class="add-reaction-btn" title="Add reaction">+</button></div>`;
    }

    // Thread button HTML (only for parent messages in main feed)
    let threadBtnHtml = "";
    if (!isThreadReply && msg.replies && msg.replies.length > 0) {
      threadBtnHtml = `
        <div class="thread-preview-pill" data-msg-id="${msg.id}">
          <span>💬</span>
          <span class="reply-count">${msg.replies.length} ${msg.replies.length === 1 ? 'reply' : 'replies'}</span>
          <span style="font-size: 11px; color: var(--text-muted); font-weight: normal;">Last reply ${msg.replies[msg.replies.length - 1].timestamp}</span>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="message-avatar" style="background-color: ${msg.authorAvatar || '#4A154B'};">
        ${initial}
      </div>
      <div class="message-content">
        <div class="message-meta">
          <span class="message-author">${this.escapeHtml(msg.authorName)}</span>
          ${msg.isBot ? '<span class="message-bot-badge">APP</span>' : ''}
          <span class="message-time">${msg.timestamp}</span>
        </div>
        <div class="message-text">${formattedText}</div>
        ${attachmentHtml}
        ${reactionsHtml}
        ${threadBtnHtml}
      </div>
      <div class="message-actions-hover">
        <button class="action-hover-btn btn-hover-react" title="Add reaction">😀</button>
        ${!isThreadReply ? `<button class="action-hover-btn btn-hover-thread" title="Reply in thread">💬</button>` : ''}
        <button class="action-hover-btn btn-hover-star" title="Save message">⭐</button>
      </div>
    `;

    // Hook up reactions click
    card.querySelectorAll(".reaction-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        const emoji = pill.dataset.emoji;
        this.store.toggleReaction(msg.id, emoji, isThreadReply, isThreadReply ? msg.id : null);
        this.renderConversation();
      });
    });

    const addReactionBtn = card.querySelector(".add-reaction-btn");
    if (addReactionBtn) {
      addReactionBtn.addEventListener("click", (e) => {
        this.showEmojiPicker(e.clientX, e.clientY, (emoji) => {
          this.store.toggleReaction(msg.id, emoji, isThreadReply, isThreadReply ? msg.id : null);
          this.renderConversation();
        });
      });
    }

    // Hover React button
    const hoverReactBtn = card.querySelector(".btn-hover-react");
    if (hoverReactBtn) {
      hoverReactBtn.addEventListener("click", (e) => {
        this.showEmojiPicker(e.clientX, e.clientY, (emoji) => {
          this.store.toggleReaction(msg.id, emoji, isThreadReply, isThreadReply ? msg.id : null);
          this.renderConversation();
        });
      });
    }

    // Hover Thread button & Thread pill
    const hoverThreadBtn = card.querySelector(".btn-hover-thread");
    if (hoverThreadBtn) {
      hoverThreadBtn.addEventListener("click", () => this.openThread(msg.id));
    }
    const threadPill = card.querySelector(".thread-preview-pill");
    if (threadPill) {
      threadPill.addEventListener("click", () => this.openThread(msg.id));
    }

    return card;
  }

  // ---------------------------------------------------------------------------
  // Thread Drawer
  // ---------------------------------------------------------------------------
  openThread(messageId) {
    this.store.activeThreadMessageId = messageId;
    const drawer = document.getElementById("thread-drawer");
    drawer.style.display = "flex";
    this.renderThreadDrawer(messageId);
  }

  closeThread() {
    this.store.activeThreadMessageId = null;
    const drawer = document.getElementById("thread-drawer");
    drawer.style.display = "none";
  }

  renderThreadDrawer(messageId) {
    const parentMsg = this.store.data.messages.find(m => m.id === messageId);
    if (!parentMsg) {
      this.closeThread();
      return;
    }

    const parentContainer = document.getElementById("thread-parent-container");
    parentContainer.innerHTML = "";
    const parentCard = this.createMessageCardElement(parentMsg, false);
    // Remove the thread pill inside the thread drawer
    parentCard.querySelector(".thread-preview-pill")?.remove();
    parentContainer.appendChild(parentCard);

    const repliesContainer = document.getElementById("thread-replies-container");
    repliesContainer.innerHTML = "";

    const replies = parentMsg.replies || [];
    const countEl = document.getElementById("thread-reply-count");
    if (countEl) countEl.textContent = `${replies.length} ${replies.length === 1 ? 'reply' : 'replies'}`;

    replies.forEach(reply => {
      const replyCard = this.createMessageCardElement(reply, true);
      repliesContainer.appendChild(replyCard);
    });

    repliesContainer.scrollTop = repliesContainer.scrollHeight;
  }

  // ---------------------------------------------------------------------------
  // Dedicated Views: Files, Notes, Huddle
  // ---------------------------------------------------------------------------
  switchView(viewName) {
    this.store.currentView = viewName;

    // Toggle view containers
    document.getElementById("view-chat").classList.toggle("active", viewName === "chat");
    document.getElementById("view-files").classList.toggle("active", viewName === "files");
    document.getElementById("view-notes").classList.toggle("active", viewName === "notes");
    document.getElementById("view-huddle").classList.toggle("active", viewName === "huddle");

    // Close thread drawer when leaving chat
    if (viewName !== "chat") {
      this.closeThread();
    }

    // Re-render appropriate view
    if (viewName === "files") this.renderFiles();
    if (viewName === "notes") this.renderNotes();
    if (viewName === "huddle") this.renderHuddle();

    this.renderSidebar();
  }

  renderFiles(filterType = "all") {
    const grid = document.getElementById("files-grid");
    grid.innerHTML = "";

    let files = this.store.data.files;
    if (filterType !== "all") {
      files = files.filter(f => f.type === filterType);
    }

    if (files.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align:center; padding: 60px 0; color: var(--text-secondary);">
          <div style="font-size: 32px; margin-bottom: 8px;">📁</div>
          <p>No files found in this category.</p>
        </div>
      `;
      return;
    }

    files.forEach(f => {
      const card = document.createElement("div");
      card.className = "file-card";
      let icon = "📄";
      if (f.type === "image") icon = "🖼️";
      if (f.type === "code") icon = "💻";

      card.innerHTML = `
        <div class="file-card-preview">
          ${f.previewUrl ? `<img src="${f.previewUrl}" alt="${f.name}"/>` : icon}
        </div>
        <div class="file-card-title">${this.escapeHtml(f.name)}</div>
        <div class="file-card-meta">
          <span>${f.size}</span>
          <span>#${f.channel}</span>
        </div>
        <div style="font-size: 11px; color: var(--text-muted);">Uploaded by ${this.escapeHtml(f.uploader)}</div>
      `;

      card.addEventListener("click", () => {
        alert(`File: ${f.name}\nSize: ${f.size}\nUploader: ${f.uploader}\nDate: ${f.date}\n\n[Local Workspace Demo File]`);
      });

      grid.appendChild(card);
    });
  }

  renderNotes() {
    const notesList = document.getElementById("notes-list");
    notesList.innerHTML = "";

    this.store.data.notes.forEach(note => {
      const el = document.createElement("div");
      el.className = `note-item ${this.store.activeNoteId === note.id ? 'active' : ''}`;
      el.innerHTML = `
        <div class="note-item-title">${this.escapeHtml(note.title)}</div>
        <div class="note-item-snippet">${this.escapeHtml(note.content.replace(/[#*`-]/g, '').slice(0, 50))}</div>
      `;
      el.addEventListener("click", () => {
        this.store.activeNoteId = note.id;
        this.renderNotes();
      });
      notesList.appendChild(el);
    });

    const activeNote = this.store.data.notes.find(n => n.id === this.store.activeNoteId) || this.store.data.notes[0];
    const titleInput = document.getElementById("note-title-input");
    const contentInput = document.getElementById("note-content-input");

    if (activeNote && titleInput && contentInput) {
      titleInput.value = activeNote.title;
      contentInput.value = activeNote.content;
    }
  }

  renderHuddle() {
    const huddleState = this.store.huddleState;
    const micBtn = document.getElementById("huddle-mic-btn");
    const videoBtn = document.getElementById("huddle-video-btn");
    const screenBtn = document.getElementById("huddle-screen-btn");
    const selfCard = document.getElementById("huddle-self-card");
    const screenCard = document.getElementById("huddle-screenshare-card");

    if (micBtn) {
      micBtn.className = `huddle-btn ${huddleState.isMuted ? 'muted' : 'active'}`;
      micBtn.innerHTML = huddleState.isMuted ? '🔇' : '🎙️';
    }
    if (videoBtn) {
      videoBtn.className = `huddle-btn ${huddleState.isVideoOn ? 'active' : ''}`;
      videoBtn.innerHTML = huddleState.isVideoOn ? '📹' : '🚫';
    }
    if (screenBtn) {
      screenBtn.className = `huddle-btn ${huddleState.isScreenSharing ? 'active' : ''}`;
      screenBtn.innerHTML = '💻';
    }

    if (screenCard) {
      screenCard.style.display = huddleState.isScreenSharing ? 'flex' : 'none';
    }

    // Start simulated audio visualizer loop on canvas
    this.startHuddleAudioVisualizer();
  }

  startHuddleAudioVisualizer() {
    const canvas = document.getElementById("huddle-audio-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let step = 0;

    const draw = () => {
      if (this.store.currentView !== "huddle") return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isMuted = this.store.huddleState.isMuted;
      const numBars = 12;
      const barWidth = 6;
      const gap = 4;

      for (let i = 0; i < numBars; i++) {
        let height = 4;
        if (!isMuted) {
          // Dynamic wave height simulation
          height = Math.sin(step * 0.15 + i * 0.5) * 8 + 12 + (Math.random() * 4);
        }
        ctx.fillStyle = isMuted ? "#616061" : "#2EB67D";
        ctx.fillRect(i * (barWidth + gap) + 6, (canvas.height - height) / 2, barWidth, height);
      }

      step++;
      this.huddleAudioAnimFrame = requestAnimationFrame(draw);
    };

    if (this.huddleAudioAnimFrame) cancelAnimationFrame(this.huddleAudioAnimFrame);
    draw();
  }

  triggerHuddleEmojiBurst(emoji = "🎉") {
    const grid = document.querySelector(".huddle-grid");
    if (!grid) return;

    for (let i = 0; i < 6; i++) {
      const el = document.createElement("div");
      el.className = "emoji-burst";
      el.textContent = emoji;
      el.style.left = `${30 + Math.random() * 40}%`;
      el.style.top = `${40 + Math.random() * 30}%`;
      el.style.setProperty("--tx", `${(Math.random() - 0.5) * 160}px`);
      grid.appendChild(el);

      setTimeout(() => el.remove(), 1800);
    }
  }

  // ---------------------------------------------------------------------------
  // Emoji Picker Popup
  // ---------------------------------------------------------------------------
  showEmojiPicker(x, y, onSelect) {
    let picker = document.getElementById("emoji-picker-modal");
    if (!picker) {
      picker = document.createElement("div");
      picker.id = "emoji-picker-modal";
      picker.className = "emoji-picker-popup";
      const emojis = ["👍", "❤️", "🚀", "🎉", "🔥", "👀", "💡", "👏", "💯", "😂", "✨", "🙌"];
      emojis.forEach(em => {
        const span = document.createElement("div");
        span.className = "emoji-option";
        span.textContent = em;
        span.addEventListener("click", () => {
          onSelect(em);
          picker.classList.remove("open");
        });
        picker.appendChild(span);
      });
      document.body.appendChild(picker);
    }

    picker.style.left = `${Math.min(x, window.innerWidth - 220)}px`;
    picker.style.top = `${Math.min(y - 100, window.innerHeight - 150)}px`;
    picker.classList.add("open");

    const closeHandler = (e) => {
      if (!picker.contains(e.target)) {
        picker.classList.remove("open");
        document.removeEventListener("click", closeHandler);
      }
    };
    setTimeout(() => document.addEventListener("click", closeHandler), 10);
  }

  // ---------------------------------------------------------------------------
  // Event Binding
  // ---------------------------------------------------------------------------
  bindEvents() {
    // Top Navigation Links
    document.querySelectorAll(".nav-item[data-view]").forEach(btn => {
      btn.addEventListener("click", () => this.switchView(btn.dataset.view));
    });

    // Message Input Composer
    const composerTextarea = document.getElementById("composer-input");
    const sendBtn = document.getElementById("composer-send-btn");
    const fileInput = document.getElementById("file-upload-input");
    const attachBtn = document.getElementById("composer-attach-btn");
    const emojiBtn = document.getElementById("composer-emoji-btn");

    if (sendBtn && composerTextarea) {
      sendBtn.addEventListener("click", () => this.handleSendMessage());
      composerTextarea.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          this.handleSendMessage();
        }
      });
    }

    // File Attachment Input
    if (attachBtn && fileInput) {
      attachBtn.addEventListener("click", () => fileInput.click());
      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        const isImage = file.type.startsWith("image/");
        reader.onload = (event) => {
          this.pendingAttachment = {
            name: file.name,
            size: `${(file.size / 1024).toFixed(1)} KB`,
            type: isImage ? "image" : "document",
            url: isImage ? event.target.result : null
          };
          this.showAttachmentPreviewBadge(file.name);
        };
        if (isImage) {
          reader.readAsDataURL(file);
        } else {
          this.pendingAttachment = {
            name: file.name,
            size: `${(file.size / 1024).toFixed(1)} KB`,
            type: "document"
          };
          this.showAttachmentPreviewBadge(file.name);
        }
      });
    }

    if (emojiBtn && composerTextarea) {
      emojiBtn.addEventListener("click", (e) => {
        this.showEmojiPicker(e.clientX, e.clientY, (emoji) => {
          composerTextarea.value += emoji;
          composerTextarea.focus();
        });
      });
    }

    // Thread Close & Thread Send
    const threadCloseBtn = document.getElementById("thread-close-btn");
    if (threadCloseBtn) {
      threadCloseBtn.addEventListener("click", () => this.closeThread());
    }

    const threadInput = document.getElementById("thread-composer-input");
    const threadSendBtn = document.getElementById("thread-send-btn");
    if (threadSendBtn && threadInput) {
      const sendThread = () => {
        const text = threadInput.value;
        if (!text.trim() || !this.store.activeThreadMessageId) return;
        this.store.addThreadReply(this.store.activeThreadMessageId, text);
        threadInput.value = "";
        this.renderThreadDrawer(this.store.activeThreadMessageId);
        this.renderConversation();
      };

      threadSendBtn.addEventListener("click", sendThread);
      threadInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendThread();
        }
      });
    }

    // Channel Modal
    const addChannelBtn = document.getElementById("add-channel-btn");
    const channelModal = document.getElementById("channel-modal");
    const channelModalClose = document.getElementById("channel-modal-close");
    const channelModalCancel = document.getElementById("channel-modal-cancel");
    const channelForm = document.getElementById("channel-form");

    if (addChannelBtn && channelModal) {
      addChannelBtn.addEventListener("click", () => {
        channelModal.classList.add("open");
        document.getElementById("new-channel-name").focus();
      });
    }
    const closeChannelModal = () => channelModal?.classList.remove("open");
    channelModalClose?.addEventListener("click", closeChannelModal);
    channelModalCancel?.addEventListener("click", closeChannelModal);

    channelForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("new-channel-name");
      const topicInput = document.getElementById("new-channel-topic");
      const isPrivateInput = document.getElementById("new-channel-private");

      const created = this.store.addChannel(nameInput.value, topicInput.value, isPrivateInput.checked);
      if (created) {
        nameInput.value = "";
        topicInput.value = "";
        isPrivateInput.checked = false;
        closeChannelModal();
        this.selectConversation(created.id, "channel");
      }
    });

    // Global Search Bar & Modal
    const searchInput = document.getElementById("global-search-input");
    const searchModal = document.getElementById("search-modal");
    const searchModalClose = document.getElementById("search-modal-close");
    const searchResultsList = document.getElementById("search-results-list");

    const openSearch = (q = "") => {
      searchModal.classList.add("open");
      const modalInput = document.getElementById("modal-search-input");
      if (modalInput) {
        modalInput.value = q;
        modalInput.focus();
        this.performSearch(q);
      }
    };

    if (searchInput) {
      searchInput.addEventListener("focus", () => openSearch(searchInput.value));
      searchInput.addEventListener("input", () => openSearch(searchInput.value));
    }

    // Keyboard shortcut '/' or 'Ctrl+K'
    window.addEventListener("keydown", (e) => {
      if ((e.key === "/" || (e.ctrlKey && e.key === "k")) && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        e.preventDefault();
        openSearch();
      }
      if (e.key === "Escape") {
        searchModal?.classList.remove("open");
        channelModal?.classList.remove("open");
      }
    });

    searchModalClose?.addEventListener("click", () => searchModal.classList.remove("open"));

    const modalSearchInput = document.getElementById("modal-search-input");
    if (modalSearchInput) {
      modalSearchInput.addEventListener("input", (e) => this.performSearch(e.target.value));
    }

    // File Filter Chips
    document.querySelectorAll(".file-filters .filter-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        document.querySelectorAll(".file-filters .filter-chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        this.renderFiles(chip.dataset.filter);
      });
    });

    // Notes Actions
    const newNoteBtn = document.getElementById("new-note-btn");
    const noteTitleInput = document.getElementById("note-title-input");
    const noteContentInput = document.getElementById("note-content-input");

    if (newNoteBtn) {
      newNoteBtn.addEventListener("click", () => {
        this.store.createNote("New Team Note");
        this.renderNotes();
      });
    }

    if (noteTitleInput && noteContentInput) {
      const saveActiveNote = () => {
        if (!this.store.activeNoteId) return;
        this.store.updateNote(this.store.activeNoteId, noteTitleInput.value, noteContentInput.value);
        this.renderNotes();
      };
      noteTitleInput.addEventListener("input", saveActiveNote);
      noteContentInput.addEventListener("input", saveActiveNote);
    }

    // Huddle Buttons
    const startHuddleHeaderBtn = document.getElementById("header-huddle-btn");
    if (startHuddleHeaderBtn) {
      startHuddleHeaderBtn.addEventListener("click", () => {
        this.store.huddleState.inHuddle = true;
        this.switchView("huddle");
      });
    }

    const huddleMicBtn = document.getElementById("huddle-mic-btn");
    if (huddleMicBtn) {
      huddleMicBtn.addEventListener("click", () => {
        this.store.huddleState.isMuted = !this.store.huddleState.isMuted;
        this.renderHuddle();
      });
    }

    const huddleVideoBtn = document.getElementById("huddle-video-btn");
    if (huddleVideoBtn) {
      huddleVideoBtn.addEventListener("click", () => {
        this.store.huddleState.isVideoOn = !this.store.huddleState.isVideoOn;
        this.renderHuddle();
      });
    }

    const huddleScreenBtn = document.getElementById("huddle-screen-btn");
    if (huddleScreenBtn) {
      huddleScreenBtn.addEventListener("click", () => {
        this.store.huddleState.isScreenSharing = !this.store.huddleState.isScreenSharing;
        this.renderHuddle();
      });
    }

    const huddleEmojiBtn = document.getElementById("huddle-emoji-btn");
    if (huddleEmojiBtn) {
      huddleEmojiBtn.addEventListener("click", () => {
        const burstEmojis = ["🎉", "🔥", "🚀", "👏", "❤️"];
        const chosen = burstEmojis[Math.floor(Math.random() * burstEmojis.length)];
        this.triggerHuddleEmojiBurst(chosen);
      });
    }

    const huddleLeaveBtn = document.getElementById("huddle-leave-btn");
    if (huddleLeaveBtn) {
      huddleLeaveBtn.addEventListener("click", () => {
        this.store.huddleState.inHuddle = false;
        this.store.huddleState.isScreenSharing = false;
        this.switchView("chat");
      });
    }

    // Reset Sample Data
    const resetBtn = document.getElementById("reset-sample-data-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (confirm("Reset My Workspace to original sample data? Any newly created channels or messages will be cleared.")) {
          this.store.resetToDefaults();
          this.init();
        }
      });
    }
  }

  showAttachmentPreviewBadge(filename) {
    const bar = document.querySelector(".composer-tools-left");
    let badge = document.getElementById("pending-attachment-badge");
    if (!badge) {
      badge = document.createElement("span");
      badge.id = "pending-attachment-badge";
      badge.style.cssText = "font-size: 11px; background: #E8F0FE; color: #1264A3; padding: 2px 8px; border-radius: 4px; display: flex; align-items: center; gap: 4px;";
      bar.appendChild(badge);
    }
    badge.innerHTML = `📎 ${this.escapeHtml(filename)} <button id="remove-att-btn" style="background:none;border:none;cursor:pointer;font-weight:bold;">×</button>`;
    document.getElementById("remove-att-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      this.pendingAttachment = null;
      badge.remove();
    });
  }

  handleSendMessage() {
    const textarea = document.getElementById("composer-input");
    const text = textarea.value;
    if (!text.trim() && !this.pendingAttachment) return;

    this.store.sendMessage(text, this.pendingAttachment);

    // Sync to cloud if connected
    if (typeof window !== "undefined" && window.cloudService?.isConnected) {
      window.cloudService.postMessage(this.store.activeConversationId, text, this.pendingAttachment);
    }

    textarea.value = "";
    this.pendingAttachment = null;
    document.getElementById("pending-attachment-badge")?.remove();
    this.renderConversation();
  }

  performSearch(query) {
    const list = document.getElementById("search-results-list");
    if (!list) return;
    list.innerHTML = "";

    const results = this.store.search(query);

    if (results.length === 0) {
      list.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted);">No matching results found.</div>`;
      return;
    }

    results.forEach(res => {
      const item = document.createElement("div");
      item.className = "search-result-item";
      item.innerHTML = `
        <div class="search-result-header">
          <span>${this.escapeHtml(res.title)}</span>
          <span style="color: var(--text-muted); font-size: 11px;">${res.date}</span>
        </div>
        <div class="search-result-text">${this.escapeHtml(res.snippet)}</div>
      `;

      item.addEventListener("click", () => {
        document.getElementById("search-modal").classList.remove("open");
        if (res.type === "message" || res.type === "thread_reply") {
          this.selectConversation(res.conversationId, res.conversationType);
          setTimeout(() => {
            const targetEl = document.getElementById(`msg-${res.messageId}`);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
              targetEl.style.backgroundColor = "#FFF3CD";
              setTimeout(() => targetEl.style.backgroundColor = "", 2000);
            }
          }, 150);
        } else if (res.type === "file") {
          this.switchView("files");
        } else if (res.type === "note") {
          this.store.activeNoteId = res.noteId;
          this.switchView("notes");
        }
      });

      list.appendChild(item);
    });
  }

  escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// Initialize Application when DOM is ready
if (typeof document !== 'undefined' && document.addEventListener) {
  document.addEventListener("DOMContentLoaded", () => {
    const app = new WorkspaceUI(store);
    app.init();
    window.myWorkspaceApp = app;
    window.myWorkspaceStore = store;
  });
}

// Export for tests and module loaders
if (typeof globalThis !== 'undefined') {
  globalThis.WorkspaceStore = WorkspaceStore;
  globalThis.WorkspaceUI = WorkspaceUI;
  globalThis.DEFAULT_WORKSPACE_DATA = DEFAULT_WORKSPACE_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WorkspaceStore, WorkspaceUI, DEFAULT_WORKSPACE_DATA };
}
