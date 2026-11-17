# T69 Chat

> **Unified multi-model AI workbench with real-time Convex persistence and Clerk authentication.**

[![T69 Chat Interface](media/overview.png)](media/walkthrough.mp4)

*Click the preview card above to watch the multi-model demo.*

---

## Why I Built This

Toggling between multiple vendor interfaces to compare model responses means losing prompt history and dealing with wildly different UI ergonomics. 

T69 Chat provides a unified chat canvas where you can switch between OpenAI and Google models on the fly. It features real-time reactive state management via Convex, LaTeX mathematical rendering for equations, syntax-highlighted code execution blocks, and Clerk user authentication.

## Standout Features

- **Multi-Model Provider Switching:** Switch between GPT-4o and Gemini Pro without dropping conversation context.
- **LaTeX & Markdown Formatting:** Renders equations, mathematical proofs, and code snippets with full syntax themes.
- **Reactive Cloud Sync:** Powered by Convex for instant multi-tab and multi-device state synchronization.

## Media

- **Workbench Interface:** `media/overview.png`
- **Walkthrough Video:** `media/walkthrough.mp4`

## Setup

```bash
git clone https://github.com/Invictine/t69-chat.git
cd t69-chat
npm install
npx convex dev
npm run dev
```
