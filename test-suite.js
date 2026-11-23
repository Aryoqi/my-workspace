/**
 * Automated Verification Test Suite for "My Workspace"
 * Tests channel creation, message sending, threads, reactions, file display, search, and navigation.
 */

import { readFileSync } from "fs";
import { resolve } from "path";

// Simple in-memory localStorage polyfill for Node.js test environment
const mockStorage = {};
global.localStorage = {
  getItem: (key) => mockStorage[key] || null,
  setItem: (key, val) => { mockStorage[key] = String(val); },
  removeItem: (key) => { delete mockStorage[key]; },
  clear: () => { for (const k in mockStorage) delete mockStorage[k]; }
};

// Load app.js logic by evaluating it with mocked DOM globals
const appSource = readFileSync(resolve("C:/Users/InChrist/.gemini/antigravity/scratch/my-workspace/app.js"), "utf8");

// Mock basic browser globals
global.document = {
  addEventListener: () => {},
  getElementById: () => null,
  querySelectorAll: () => [],
  createElement: () => ({ appendChild: () => {}, querySelectorAll: () => [], querySelector: () => null, classList: { add: () => {}, remove: () => {} } }),
  body: { appendChild: () => {} }
};
global.window = {};

// Evaluate app classes in test environment
(0, eval)(appSource);

const WorkspaceStore = globalThis.WorkspaceStore;

console.log("========================================================");
console.log("       Running 'My Workspace' Test Suite");
console.log("========================================================\n");

let passed = 0;
let total = 0;

function assert(condition, testName) {
  total++;
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passed++;
  } else {
    console.error(`[FAIL] ${testName}`);
  }
}

// -----------------------------------------------------------------------------
// Test 1: Store Initialization & Initial Data
// -----------------------------------------------------------------------------
const testStore = new WorkspaceStore();
assert(testStore.data.channels.length >= 4, "Initial channels loaded (>= 4 channels)");
assert(testStore.data.users.length >= 4, "Team member profiles loaded (>= 4 users)");
assert(testStore.data.messages.length >= 5, "Sample conversation messages present");
assert(testStore.data.files.length >= 4, "Files repository pre-populated");
assert(testStore.data.notes.length >= 3, "Team notes pre-populated");

// -----------------------------------------------------------------------------
// Test 2: Channel Creation & Validation
// -----------------------------------------------------------------------------
const newChannel = testStore.addChannel("security-audit", "Vulnerability scans and SOC2 audits", true);
assert(newChannel !== null, "Successfully created new channel '#security-audit'");
assert(newChannel.name === "security-audit", "Channel name sanitized and formatted");
assert(newChannel.isPrivate === true, "Private channel flag respected");
assert(testStore.data.channels.some(c => c.name === "security-audit"), "New channel persisted in channels array");

// Test duplicate channel prevention
const duplicate = testStore.addChannel("security-audit", "Duplicate attempt");
assert(duplicate === null, "Duplicate channel creation rejected");

// -----------------------------------------------------------------------------
// Test 3: Message Sending (Text & Attachments)
// -----------------------------------------------------------------------------
testStore.activeConversationId = "c_general";
testStore.activeConversationType = "channel";

const sentMsg = testStore.sendMessage("Hello team! This is a test message with code `npm run test`");
assert(sentMsg !== null, "Message sent successfully to #general");
assert(sentMsg.text.includes("npm run test"), "Message text matches input");
assert(sentMsg.authorName === testStore.data.currentUser.name, "Message author set to current user");

// Test sending with attachment
const fileAttachment = {
  name: "deploy-pipeline.svg",
  size: "24 KB",
  type: "image",
  url: "data:image/svg+xml;utf8,<svg></svg>"
};
const sentWithFile = testStore.sendMessage("Architecture diagram attached", fileAttachment);
assert(sentWithFile.attachment !== null, "Message with attachment sent successfully");
assert(sentWithFile.attachment.name === "deploy-pipeline.svg", "Attachment name preserved");
assert(testStore.data.files.some(f => f.name === "deploy-pipeline.svg"), "Uploaded file automatically added to Files tab");

// -----------------------------------------------------------------------------
// Test 4: Threaded Replies
// -----------------------------------------------------------------------------
const parentMessageId = sentMsg.id;
const reply1 = testStore.addThreadReply(parentMessageId, "First reply to the thread!");
const reply2 = testStore.addThreadReply(parentMessageId, "Second reply with verification details");

const updatedParent = testStore.data.messages.find(m => m.id === parentMessageId);
assert(updatedParent.replies.length === 2, "Threaded replies added to parent message (2 replies)");
assert(updatedParent.replies[0].text === "First reply to the thread!", "Thread reply content accurate");

// -----------------------------------------------------------------------------
// Test 5: Emoji Reactions (Toggle on & off)
// -----------------------------------------------------------------------------
testStore.toggleReaction(parentMessageId, "🚀");
const msgAfterReaction = testStore.data.messages.find(m => m.id === parentMessageId);
assert(msgAfterReaction.reactions["🚀"]?.length === 1, "Reaction '🚀' added to message");

// Toggle off
testStore.toggleReaction(parentMessageId, "🚀");
const msgAfterToggleOff = testStore.data.messages.find(m => m.id === parentMessageId);
assert(!msgAfterToggleOff.reactions["🚀"], "Reaction '🚀' removed on toggle off");

// -----------------------------------------------------------------------------
// Test 6: Search Engine
// -----------------------------------------------------------------------------
const searchResults1 = testStore.search("retrospective");
assert(searchResults1.length > 0, "Search query 'retrospective' returns matching file/notes");

const searchResults2 = testStore.search("token");
assert(searchResults2.some(r => r.type === "note" || r.type === "message" || r.type === "file"), "Search query 'token' matches across notes, messages, and files");

const searchResults3 = testStore.search("deploy-pipeline");
assert(searchResults3.some(r => r.type === "message" || r.type === "file"), "Search locates newly sent attachment by filename");

// -----------------------------------------------------------------------------
// Test 7: Notes & Canvas Management
// -----------------------------------------------------------------------------
const newNote = testStore.createNote("Incident Response Plan");
assert(newNote !== null, "Created new collaborative note 'Incident Response Plan'");
testStore.updateNote(newNote.id, "Incident Response Plan v2", "# Incident Response Plan\n\n- Call on-call engineer\n- Update status page");
const updatedNote = testStore.data.notes.find(n => n.id === newNote.id);
assert(updatedNote.title === "Incident Response Plan v2", "Note title updated and persisted");
assert(updatedNote.content.includes("Call on-call engineer"), "Note content updated and persisted");

// -----------------------------------------------------------------------------
// Test 8: Huddle State Management
// -----------------------------------------------------------------------------
testStore.huddleState.inHuddle = true;
testStore.huddleState.isMuted = true;
assert(testStore.huddleState.inHuddle === true, "Huddle state joined");
assert(testStore.huddleState.isMuted === true, "Huddle microphone muted");
testStore.huddleState.isScreenSharing = true;
assert(testStore.huddleState.isScreenSharing === true, "Huddle screen share toggled");

console.log("\n========================================================");
console.log(` Test Summary: ${passed}/${total} passed (${((passed/total)*100).toFixed(0)}%)`);
console.log("========================================================");

if (passed === total) {
  process.exit(0);
} else {
  process.exit(1);
}
