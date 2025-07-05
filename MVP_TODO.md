# MVP TODO List

This file tracks the minimum viable product (MVP) tasks for the Prompt.fun project. Each task is broken down by system, with dependencies for parallel work. Update this file as you make progress.

---

## Gemini Server (Prompt Parsing & Routing)

- [ ] **Implement Gemini Server**
    - [ ] Set up FastAPI/Node.js project structure
    - [ ] Configure environment variables (Gemini API key, RAG server URL, DB credentials)
    - [ ] Implement basic health check endpoint
- [ ] **Implement `/parse` Endpoint**
    - [ ] Define request/response schema for prompt parsing
    - [ ] Integrate Gemini API call for intent extraction
    - [ ] Return structured JSON with intent, entities, and fallback handling
- [ ] **Implement Routing Logic**
    - [ ] Map Gemini intents to backend actions (launch_token, buy_token, ask_question, etc.)
    - [ ] Forward RAG queries to RAG server `/query` endpoint
    - [ ] Forward token/XP actions to web2 API endpoints
    - [ ] Implement fallback to Copilot for unrecognized prompts
- [ ] **Integrate with RAG Server**
    - [ ] Test RAG server communication (question/answer flow)
    - [ ] Handle RAG server errors and timeouts
    - [ ] Format Copilot responses for frontend display
- [ ] **Integrate with Web2 API**
    - [ ] Implement token launch, buy, sell, XP, and portfolio API calls
    - [ ] Handle API errors and validation
    - [ ] Return action results to frontend

---

## Frontend (Console UI & Traditional UI)

- [ ] **Implement Prompt Console UI**
    - [ ] Design terminal-style input box and output area
    - [ ] Display Gemini intent and Copilot responses inline
    - [ ] Show action feedback (toasts, status messages)
    - [ ] Support command history and keyboard navigation
- [ ] **Connect Console to Gemini Server**
    - [ ] Send prompt to Gemini server `/parse` endpoint
    - [ ] Display parsed intent and action results
    - [ ] Handle loading, error, and fallback states
- [ ] **Implement Fallback Traditional UI Pages**
    - [ ] Home: CTA prompt, trending tokens
    - [ ] Token Page: Live chart, buy/sell, stats
    - [ ] Profile: XP meter, wallet holdings, history
    - [ ] Leaderboard: Top XP, tokens, creators
    - [ ] Buttons trigger Gemini intents (simulate prompt click)
    - [ ] Token card click opens prompt with preset query
- [ ] **Implement Wallet Connect and Status**
    - [ ] Integrate wallet connect button and status display
    - [ ] Show wallet status inline in console and fallback UI
    - [ ] Handle wallet errors and reconnect flow
- [ ] **Integrate XP System**
    - [ ] Display XP in console and profile
    - [ ] Award XP for actions (buy, launch, sell)
    - [ ] Show XP notifications inline (e.g., "+5 XP for your buy!")

---

## Move Contracts & Blockchain

- [ ] **Deploy Move Contracts**
    - [ ] Review and finalize PromptToken, BondingCurve, XPSystem contracts
    - [ ] Compile and deploy contracts to Aptos DevNet/Testnet
    - [ ] Extract and document contract addresses
    - [ ] Update frontend/backend with deployed addresses
    - [ ] Test contract entry functions from CLI or script

---

## DevNet/Sim Mode

- [ ] **Set Up DevNet/Sim Mode**
    - [ ] Add toggle for Sim Mode in frontend
    - [ ] Implement mock wallet and logic for Sim Mode
    - [ ] Integrate Aptos faucet for test tokens
    - [ ] Display Sim Mode status in UI

---

## Deployment & QA

- [ ] **Deploy All Services**
    - [ ] Deploy RAG server to Render/Railway
    - [ ] Deploy Gemini server to Render/Railway
    - [ ] Deploy frontend to Vercel/Netlify
    - [ ] Set up environment variables and secrets in cloud
    - [ ] Verify all endpoints and integrations in production
- [ ] **MVP QA and Bugfix**
    - [ ] Test end-to-end flows (prompt, token actions, Copilot, XP)
    - [ ] Fix critical bugs and polish UX
    - [ ] Collect feedback and iterate on UI/UX
    - [ ] Prepare MVP demo and documentation

---

### Dependencies
- Gemini server and frontend console UI can be developed in parallel.
- RAG server and contracts should be deployed before full integration testing.
- QA and deployment are last steps.

---

**Update this file as tasks are completed or requirements change.** 