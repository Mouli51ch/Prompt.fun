---

---

## 🔷 1. Prompt Parsing & Routing (via Gemini)

**Goal:** All major actions can be executed from the prompt

### ✅ Tasks:

- [ ]  Gemini-based `parse_prompt()`
- [ ]  Set up `/parse` route in backend
- [ ]  Add fallback: if prompt not understood → send to `/ask` (RAG Copilot)
- [ ]  Support intent types:
    - `launch_token`
    - `buy_token`
    - `sell_token`
    - `get_trending`
    - `get_portfolio`
    - `ask_question`
    - `get_token_info`
- [ ]  Backend logic to route based on Gemini’s JSON output

---

## 🔷 2. Smart Contracts (Move on Aptos)

**Goal:** Deploy and trade tokens using bonding curves

### ✅ Token Contracts

- [ ]  `TokenFactory.move` (launches token with metadata)
- [ ]  `BondingCurve.move` (price logic for buy/sell)
- [ ]  `XPTracker.move` (optional XP/NFT logic, can stub out for now)
- [ ]  Deploy to Aptos devnet + extract contract addresses

---

## 🔷 3. Backend API (Node.js or Python)

**Goal:** Acts as a middleware between prompt → Gemini → Aptos chain + Copilot

### ✅ Routes:

| Route | Purpose |
| --- | --- |
| `POST /parse` | Receives raw prompt, returns intent |
| `POST /launch-token` | Deploys token via Move |
| `POST /buy-token` | Buys via bonding curve |
| `POST /sell-token` | Sells tokens |
| `GET /portfolio/:wallet` | Returns user's holdings |
| `GET /token-info/:symbol` | Returns price, supply, holders |
| `POST /ask` | Sends natural question to RAG server |

---

## 🔷 4. Console UI (Prompt Interface)

**Goal:** Gamified chat/console where users type all commands

### ✅ Components:

- [ ]  Input box for prompt (styled like terminal)
- [ ]  Gemini intent result → toast + action feedback
- [ ]  Inline Copilot responses (from RAG)
- [ ]  Wallet connect status inline
- [ ]  XP notifications inline ("+5 XP for your buy!")

---

## 🔷 5. Traditional UI Pages (Fallback Interface)

**Goal:** Users who don’t want to type prompts can still use the dApp

### ✅ Pages:

| Page | UI Features |
| --- | --- |
| Home | CTA prompt + trending tokens |
| Token Page | Live chart, buy/sell buttons, stats |
| Profile | XP meter, wallet holdings, history |
| Leaderboard | Top XP, top tokens, top creators |
- [ ]  Buttons → internally trigger Gemini intents (simulate prompt click)
- [ ]  Token card click → opens prompt with preset query

---

## 🔷 6. Copilot (RAG Server Integration)

**Goal:** Explain terms, give guidance, reduce user friction

### ✅ RAG Use Cases:

- [ ]  User types “What is bonding curve?” → Copilot replies
- [ ]  First-time user → Copilot greets with usage help
- [ ]  UX fallback for incomplete prompts

---

## 🔷 7. Gamification Engine

**Goal:** Add sticky behavior to trading & prompt exploration

### ✅ XP System

- [ ]  XP per action (buy, launch, sell, login)
- [ ]  Display XP in console and profile
- [ ]  Quest system (optional for MVP)

### ✅ Optional:

- [ ]  Fake NFT unlocks
- [ ]  Mini quest cards in UI ("Buy 3 trending tokens")

---

## 🔷 8. DevNet / Sim Mode

**Goal:** Let users experiment freely

### ✅ Setup:

- [ ]  Aptos DevNet usage
- [ ]  Faucet integration
- [ ]  Toggle “Sim Mode” (mock wallet and logic)

---

## 🔷 9. Hosting / Infra

| Service | Role | Platform |
| --- | --- | --- |
| Frontend | Console + UI | Vercel/Netlify |
| Backend | Gemini + routing | Render/Railway |
| RAG Server | AI Copilot | Already working ✅ |
| Move contracts | Chain infra | Aptos DevNet |

---

## 🧪 MVP Ready Checklist

| ✅ Feature | Status |
| --- | --- |
| Prompt console accepts natural commands | ⬜ |
| Token launch via prompt works | ⬜ |
| Buy/sell via bonding curve works | ⬜ |
| Trending tokens visible | ⬜ |
| XP/leaderboard system integrated | ⬜ |
| Copilot responds to questions | ⬜ |
| Traditional UI works for fallback users | ⬜ |
| Hosted + working on testnet | ⬜ |

---

## 🔥 Optional Final Touches

- 🌐 Add a `/docs` or `/commands` section that teaches users how to prompt
- 🎨 Add neon-cyberpunk visuals to console and trending tokens
- 🧪 Run feedback campaign with leaderboard reset weekly
- 📲 Mobile-first styling for console

---

### Ready for the next build step?

I can immediately generate:

- ✅ Gemini prompt + parser
- ✅ Console UI starter
- ✅ Smart contract files (`TokenFactory.move`, `BondingCurve.move`)
- ✅ API endpoint boilerplate (Node or FastAPI)

Just pick the next piece, and I’ll deliver the code.