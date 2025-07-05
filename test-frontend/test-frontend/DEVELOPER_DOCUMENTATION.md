# Technical Documentation: prompt.fun DeFi dApp Frontend (Web3.0 Focused)

---

## Project Structure

```
test-frontend/
  src/
    app/
      page.tsx                # Main React page/component
    hooks/
      aptos/
        useGetXP.ts           # XP system hook (fetch/init XP)
        useLaunchToken.ts     # Token launch + XP award logic
        useBuyToken.ts        # Bonding curve logic (not documented here)
    components/
      WalletButton.tsx        # Wallet connect button
      WalletStatus.tsx        # Wallet status display
  package.json
  ...
```

---

## Web3.0 Integration: Per-Function Documentation

### Wallet Connection (`@aptos-labs/wallet-adapter-react`)

#### Overview
- Uses the [Aptos Wallet Adapter](https://github.com/aptos-labs/aptos-wallet-adapter) for React.
- Supports all wallets compatible with the Aptos Wallet Standard (e.g., Petra, Martian, Fewcha, Pontem, etc).
- Handles connection, disconnection, and wallet switching.
- Provides a unified interface for signing and submitting transactions.

#### Adapter Setup
- The wallet adapter is typically initialized at the root of your React app (see [docs](https://github.com/aptos-labs/aptos-wallet-adapter)).
- Example (usually in `_app.tsx` or a provider file):
```tsx
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { PetraWallet } from 'petra-wallet-adapter';
import { MartianWallet } from '@martianwallet/aptos-wallet-adapter';

const wallets = [new PetraWallet(), new MartianWallet() /*, ...other wallets */];

<AptosWalletAdapterProvider wallets={wallets} autoConnect={true}>
  <App />
</AptosWalletAdapterProvider>
```

#### `useWallet()`
```ts
const { account, signAndSubmitTransaction, connected, wallets, disconnect, select, wallet } = useWallet();
```
- **account**: `{ address: string }` — The connected wallet's address, or `undefined` if not connected.
- **signAndSubmitTransaction**: `(payload: TransactionPayload) => Promise<TxResult>` — Signs and submits a transaction to the Aptos blockchain.
- **connected**: `boolean` — True if a wallet is connected.
- **wallets**: `WalletAdapter[]` — List of available wallet adapters (for multi-wallet UIs).
- **disconnect**: `() => Promise<void>` — Disconnects the current wallet.
- **select**: `(name: string) => Promise<void>` — Switches to a different wallet by name.
- **wallet**: `WalletAdapter | undefined` — The currently selected wallet adapter.

#### Wallet Connection Flow
- **Connect:**
  - User clicks the WalletButton (see below), selects a wallet, and approves the connection in their extension.
  - The `account` and `connected` state update automatically.
- **Disconnect:**
  - User can disconnect via the WalletButton or programmatically via `disconnect()`.
- **Switch Wallet:**
  - Use `select(walletName)` to prompt the user to switch wallets.
- **Detecting Connection:**
  - Use the `connected` boolean and `account` object to check if a wallet is connected.
- **Handling Multiple Wallets:**
  - Use the `wallets` array to display a list of available wallets for the user to choose from.

#### Example: Robust Wallet UX
```tsx
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { WalletButton } from '../components/WalletButton';
import { WalletStatus } from '../components/WalletStatus';

function MyComponent() {
  const { account, connected, disconnect, wallets, select, wallet } = useWallet();

  return (
    <div>
      <WalletButton /> {/* Handles connect/disconnect/switch UI */}
      <WalletStatus /> {/* Shows current wallet address and status */}
      {connected ? (
        <div>Connected as {account.address}</div>
      ) : (
        <div>Please connect your wallet</div>
      )}
      <button onClick={disconnect}>Disconnect</button>
      <ul>
        {wallets.map(w => (
          <li key={w.name}>
            <button onClick={() => select(w.name)}>{w.name}</button>
          </li>
        ))}
      </ul>
      {wallet && <div>Current wallet: {wallet.name}</div>}
    </div>
  );
}
```

#### Best Practices
- Always check `connected` and `account` before sending transactions.
- Handle wallet disconnects gracefully (show a reconnect prompt if needed).
- Support multiple wallets for best user experience.
- Use the provided `WalletButton` and `WalletStatus` components for consistent UI/UX.
- Listen for wallet events (if needed) for advanced flows (see wallet adapter docs).

---

### Token Store Initialization

#### `initializeStore()` (from `useLaunchToken.ts`)
```ts
/**
 * Initializes the PromptToken store for the connected account.
 * Calls the Move entry function: PromptToken::init_store
 * @returns {Promise<void>} Resolves when the transaction is submitted.
 * @throws Error if wallet is not connected or transaction fails.
 */
async function initializeStore(): Promise<void>
```
- **Web3.0**: On-chain transaction, requires wallet signature.

---

### Bonding Curve Store Initialization

#### `initializeCurveStore()` (from `useBuyToken.ts`)
```ts
/**
 * Initializes the BondingCurve store for the connected account.
 * Calls the Move entry function: BondingCurve::init_curve_store
 * @returns {Promise<void>} Resolves when the transaction is submitted.
 * @throws Error if wallet is not connected or transaction fails.
 */
async function initializeCurveStore(): Promise<void>
```
- **Web3.0**: On-chain transaction, requires wallet signature.

---

### Token Launch

#### `launchToken(name: string, symbol: string, supply: number)` (from `useLaunchToken.ts`)
```ts
/**
 * Launches a new token for the connected account.
 * Calls the Move entry function: PromptToken::create_token
 * On success, awards 100 XP to the user (calls addXP).
 * @param name {string} - Token name
 * @param symbol {string} - Token symbol
 * @param supply {number} - Initial supply
 * @returns {Promise<void>} Resolves when the transaction is submitted and XP is awarded.
 * @throws Error if wallet is not connected or transaction fails.
 */
async function launchToken(name: string, symbol: string, supply: number): Promise<void>
```
- **Web3.0**: On-chain transaction, requires wallet signature.

---

### XP Awarding

#### `addXP(account, signAndSubmitTransaction, user: string, xp: number)` (from `useLaunchToken.ts`)
```ts
/**
 * Awards XP to a user by calling the Move entry function: XPSystem::add_xp
 * @param account {object} - Wallet account object (must have .address)
 * @param signAndSubmitTransaction {function} - Wallet signing function
 * @param user {string} - Address to award XP to
 * @param xp {number} - Amount of XP to award
 * @returns {Promise<void>} Resolves when the transaction is submitted.
 * @throws Error if wallet is not connected or transaction fails.
 */
async function addXP(account, signAndSubmitTransaction, user: string, xp: number): Promise<void>
```
- **Web3.0**: On-chain transaction, requires wallet signature.

---

### Bonding Curve Launch

#### `launchTokenOnCurve(symbol: string, basePrice: number)` (from `useBuyToken.ts`)
```ts
/**
 * Launches a token on the bonding curve for trading.
 * Calls the Move entry function: BondingCurve::launch_token
 * @param symbol {string} - Token symbol
 * @param basePrice {number} - Initial price
 * @returns {Promise<void>} Resolves when the transaction is submitted.
 * @throws Error if wallet is not connected or transaction fails.
 */
async function launchTokenOnCurve(symbol: string, basePrice: number): Promise<void>
```
- **Web3.0**: On-chain transaction, requires wallet signature.

---

### XP System: Fetching and Initialization

#### `useGetXP(account, signAndSubmitTransaction)` (from `useGetXP.ts`)
```ts
/**
 * React hook for fetching and initializing XP for an address.
 * @param account {object} - Wallet account object (optional)
 * @param signAndSubmitTransaction {function} - Wallet signing function (optional)
 * @returns {
 *   getXP: (address: string) => Promise<void>,
 *   loading: boolean,
 *   error: string | null,
 *   xp: number | null,
 *   xpStoreExists: boolean,
 *   initXP: (() => Promise<void>) | undefined
 * }
 */
function useGetXP(account?: any, signAndSubmitTransaction?: any)
```

#### `getXP(address: string)`
```ts
/**
 * Fetches the XP value for a given address.
 * 1. Fetches the XPStore resource.
 * 2. Extracts the table handle.
 * 3. Uses getTableItem to fetch the XP value for the address.
 * 4. If the resource does not exist, auto-calls init_xp and retries.
 * @param address {string} - The address to fetch XP for.
 * @returns {Promise<void>} Sets xp state in the hook.
 */
async function getXP(address: string): Promise<void>
```

#### `initXP(account, signAndSubmitTransaction)`
```ts
/**
 * Initializes the XPStore resource for the connected account.
 * Calls the Move entry function: XPSystem::init_xp
 * @param account {object} - Wallet account object
 * @param signAndSubmitTransaction {function} - Wallet signing function
 * @returns {Promise<void>} Resolves when the transaction is submitted.
 * @throws Error if wallet is not connected or transaction fails.
 */
async function initXP(account, signAndSubmitTransaction): Promise<void>
```
- **Web3.0**: On-chain transaction, requires wallet signature.

---

### Move Contract Call Pattern

All contract calls use the following pattern:
```ts
const payload = {
  sender: account.address,
  data: {
    function: `${CONTRACT_ADDRESS}::Module::function`,
    typeArguments: [],
    functionArguments: [ ... ]
  }
};
await signAndSubmitTransaction(payload);
```
- **CONTRACT_ADDRESS**: `'0x0dbd9929394bf1a041494101445939f44def4c2d45b12f362b2a518595552e44'`

---

### Error Handling & Auto-Initialization

- If a resource is not found (e.g., XPStore), the frontend will:
  1. Attempt to call the relevant `init_*` function.
  2. Retry the original action after initialization.
- If the account does not exist on-chain, the user must fund/create it first.

---

### XP Table Querying (Web3.0 Table API)

- The XP table is a Move `table::Table<address, u64>`.
- To fetch a user's XP:
  1. Get the XPStore resource for the store owner (usually the user's own address).
  2. Extract the `points.handle`.
  3. Use `getTableItem` with the user's address as the key.

---

### Component Integration Example

```tsx
const { account, signAndSubmitTransaction, connected } = useWallet();
const { launchToken, initializeStore } = useLaunchToken(account, signAndSubmitTransaction);
const { getXP, xp } = useGetXP(account, signAndSubmitTransaction);

<button onClick={() => launchToken(name, symbol, supply)}>Launch Token</button>
<button onClick={() => getXP(account.address)}>Fetch XP</button>
```

---

### Testing with Multiple Accounts

- If you use a new account, ensure it is funded/created on-chain before interacting.
- The frontend will auto-initialize stores/resources as needed, but the account must exist.

---

### Not Covered Here

- The buy token flow (`useBuyToken.ts`'s `buyToken` function) is not documented per your request.

---

**For further details, see the code in:**
- `src/hooks/aptos/useGetXP.ts`
- `src/hooks/aptos/useLaunchToken.ts`
- `src/app/page.tsx`

If you need even more granular inline JSDoc comments in the codebase, let me know! 