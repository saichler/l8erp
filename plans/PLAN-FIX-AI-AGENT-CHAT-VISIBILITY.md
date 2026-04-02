# Plan: Fix AI Agent Chat Window & Input Line Visibility

## Problem
The AI Agent section's chat window and input line are not visible — they fall below the screen.

## Root Cause Analysis

There are **two independent bugs**:

### Bug 1: Container ID Mismatch
The section generator creates the container with ID `agent-chat-table-container` (pattern: `{moduleKey}-{serviceKey}-table-container`), but `agent-chat-init.js` calls:
```js
L8AgentChat.init({ containerId: 'agent-chat-container', ... });
```
`document.getElementById('agent-chat-container')` returns `null`, so `L8AgentChat.init()` silently returns on line 23 without rendering anything. The chat UI is never created.

### Bug 2: CSS Height Uses Viewport Instead of Flex
Even after fixing the container ID, the chat CSS uses:
```css
.l8agent-chat { height: calc(100vh - 320px); }
```
This is wrong because the chat container is deeply nested inside a flex layout chain:
```
body → .app-container (100vh grid) → main.main-content → #content-area → .section-container
  → .l8-header-frame (120px) → .l8-module-tabs (~50px) → .section-content → .l8-module-content
    → .l8-service-content → .l8-service-view → .l8-table-container → .l8agent-chat
```
Every ancestor from `.section-content` down uses `flex: 1; min-height: 0; overflow: hidden` — the correct flex shrinking chain. But `.l8agent-chat` breaks this chain by using an absolute `calc(100vh - ...)` height instead of participating in flex layout. The viewport-based height doesn't account for all the layers above it, pushing the input area below the visible area.

## Fix

### Step 1: Fix Container ID in `agent-chat-init.js`
**File:** `aia/agent/agent-chat-init.js` line 18

Change:
```js
containerId: 'agent-chat-container',
```
To:
```js
containerId: 'agent-chat-table-container',
```

### Step 2: Fix CSS to Use Flex Layout in `l8agent-chat.css`
**File:** `l8ui/l8agent/l8agent-chat.css` lines 8-17

Change:
```css
.l8agent-chat {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 320px);
    min-height: 300px;
    border: 1px solid var(--layer8d-border);
    border-radius: 8px;
    background: var(--layer8d-bg-white);
    overflow: hidden;
}
```
To:
```css
.l8agent-chat {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    border: 1px solid var(--layer8d-border);
    border-radius: 8px;
    background: var(--layer8d-bg-white);
    overflow: hidden;
}
```

This makes `.l8agent-chat` participate in the existing flex chain rather than fighting it with a viewport-based height. The flex chain from `.l8-table-container` (which has `flex: 1; min-height: 0`) will correctly size the chat to fill the remaining space.

The `flex-shrink: 0` on `.l8agent-chat-input-area` (already present from prior edit) ensures the input line is never compressed.

### Step 3: Verify the Bubble Chat (Optional)
**File:** `l8ui/l8agent/l8agent-bubble.js` — uses the same `.l8agent-chat` class but inside a floating panel with its own fixed dimensions. The `flex: 1` change is safe because the bubble panel's parent constrains the height. No change needed.

## Files Changed
1. `aia/agent/agent-chat-init.js` — fix containerId
2. `l8ui/l8agent/l8agent-chat.css` — replace `height: calc(...)` with `flex: 1; min-height: 0`
