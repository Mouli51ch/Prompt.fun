# 🚀 Prompt.Fun

> *Launch & Trade Meme Tokens With Just a Prompt — Built on Aptos*

Prompt.Fun is a gamified, on-chain meme coin platform that enables anyone to launch, trade, and explore tokens using natural language prompts. Built on the blazing-fast Aptos blockchain, it simplifies crypto interaction through a chat-like interface and introduces a new standard for user-friendly DeFi.

---

## 🌟 Features

- *Prompt-Based Console*  
  Launch and trade tokens using simple text commands like:  
  - Launch $FROG  
  - Buy $FROG with 3 APT  
  - Sell 50% $FROG  
  - Trending tokens  
  - My tokens

- *Instant Token Launch*  
  Create meme tokens backed by bonding curve logic. No coding required.

- *Gamification*  
  Earn XP, complete quests, and climb leaderboards. Collect NFTs and badges along the way.

- *AI Copilot (Optional)*  
  Understands casual input like "Make a coin for my cat" and auto-converts it into actionable commands.

- *Cyberpunk UI*  
  Minimal, terminal-inspired design with a retro-futuristic feel.

---

## 🎯 Product Vision

Prompt.Fun reimagines Web3 interaction as a conversation. Our mission is to make DeFi simple, fun, and viral — removing the barriers that block most users from participating in crypto. It's DeFi for the next billion users, built around memes, culture, and simplicity.

---

## 👥 Who Is It For?

- 🧑‍💻 Crypto Newbies – No technical knowledge required.
- 🎭 Meme Traders – Flip viral tokens in seconds.
- 🧑‍🎨 Community Creators – Launch tokens for trends, pets, or fans.
- 🎮 Gamified Users – Earn XP and compete in quests.

---

## 🧠 How It Works (Prompt Examples)

```plaintext
Launch $MOONCAT
Buy $MOONCAT with 2 APT
Sell 50% $MOONCAT
Trending tokens
My tokens
```



---

## Main Directories & Files

### 1. `lngchainBackend/` (Backend)
- **server.py**: Main FastAPI server. Handles chat (RAG), token launch APIs, MongoDB, Pinecone, Gemini, and CORS.
- **generate_embeddings.py, chunk_pdf.py**: Utilities for document chunking and embedding (RAG context).
- **upload_to_pinecone.py**: Script to upload document chunks to Pinecone.
- **test_pinecone_retrieval.py**: Test script for Pinecone retrieval.
- **requirements.txt**: Python dependencies.

### 2. `prompt-fun-dapp/` (Frontend)
- **app/**: Next.js app directory (pages, layouts, marketplace, chat, etc.).
  - **marketplace/page.tsx**: Token marketplace UI, launches tokens, fetches from backend.
  - **chat/page.tsx**: Chat copilot UI, integrates wallet, balance, and special flows (e.g., launch token inline form).
- **components/**: Shared React components (UI, chat, wallet, etc.).
- **hooks/**: Custom React hooks for Aptos wallet, token launch, buy, XP, etc.
- **lib/marketplaceApi.ts**: API utilities for backend communication.
- **public/**: Static assets.
- **styles/**: Global and component styles.

---

## Architecture Overview

- **Frontend (`prompt-fun-dapp`)**: Next.js/React app. Handles wallet connection, chat, token launch, buy, XP, and marketplace UI. Talks to backend for chat and token APIs.
- **Backend (`lngchainBackend`)**: FastAPI app. Handles:
  - **Chat (RAG)**: Uses Langchain, Pinecone, Gemini, and context docs for retrieval-augmented generation.
  - **Token Marketplace APIs**: POST/GET endpoints for launching and listing tokens, storing in MongoDB to avoid Aptos indexer lag.
  - **XP System**: Awards XP for on-chain actions.
  - **CORS**: Allows frontend to communicate securely.
- **MongoDB**: Stores launched tokens and metadata for fast, reliable frontend queries.
- **Pinecone**: Vector database for RAG chat context.
- **Gemini**: LLM for chat responses.

### Main Flows
- **Token Launch**: User launches token via wallet → on-chain tx → backend API stores in MongoDB → token appears in marketplace.
- **Marketplace**: Frontend fetches launched tokens from backend (MongoDB), not directly from chain (avoids indexer lag).
- **Chat**: User interacts with copilot (RAG+LLM). Special commands (e.g., 'launch token') trigger custom UI/flows.

---

## 🔗 Smart Contract Addresses

| Module        | Address                                                                                         |
|---------------|--------------------------------------------------------------------------------------------------|
| Bonding Curve | 0xdbd9929394bf1a041494101445939f44def4c2d45b12f362b2a518595552e44::BondingCurve               |
| Prompt Token  | 0xdbd9929394bf1a041494101445939f44def4c2d45b12f362b2a518595552e44::PromptToken                |
| XP System     | 0xdbd9929394bf1a041494101445939f44def4c2d45b12f362b2a518595552e44::XPSystem                   |

**Contract Descriptions:**
- **BondingCurve**: Handles token bonding curve logic, including launching tokens on a curve and enabling buy/sell with dynamic pricing.
- **PromptToken**: Manages creation and storage of meme tokens, including metadata (name, symbol, supply, creator).
- **XPSystem**: Tracks and awards XP (experience points) to users for on-chain actions (e.g., launching tokens).

### 🧪 Testnet
- Network: *Aptos Testnet*
- Explorer: [Aptos Explorer](https://explorer.aptoslabs.com/account/0xdbd9929394bf1a041494101445939f44def4c2d45b12f362b2a518595552e44?network=testnet)

For setup, see each subdirectory's README or requirements file.
