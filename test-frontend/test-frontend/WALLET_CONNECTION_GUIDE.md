# Wallet Connection Implementation Guide

## Overview

This guide documents the wallet connection implementation for the Aptos DeFi dApp, based on the [AppreciateOnAptos reference implementation](https://github.com/jishnu-baruah/AppreciateOnAptos).

## Architecture

### 1. Wallet Provider Context (`src/contexts/WalletContext.tsx`)

The centralized wallet management system that wraps the entire application.

```typescript
'use client';

import { PropsWithChildren } from "react";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Network } from "@aptos-labs/ts-sdk";

export function WalletProvider({ children }: PropsWithChildren) {
    return (
        <AptosWalletAdapterProvider
            autoConnect={false}
            dappConfig={{ network: Network.TESTNET }}
            onError={(error) => {
                console.error("Wallet error:", error);
            }}
        >
            {children}
        </AptosWalletAdapterProvider>
    );
}

export { useWallet } from "@aptos-labs/wallet-adapter-react";
```

**Key Features:**
- `autoConnect={false}`: Prevents automatic connection to avoid errors
- `Network.TESTNET`: Configured for Aptos testnet
- Error handling with console logging
- Exports `useWallet` hook for components

### 2. Layout Integration (`src/app/layout.tsx`)

The wallet provider is integrated at the root layout level:

```typescript
import { WalletProvider } from "../contexts/WalletContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
```

### 3. Wallet Button Component (`src/components/WalletButton.tsx`)

A clean, user-friendly wallet connection interface:

```typescript
'use client';

import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export function WalletButton() {
    const { account, connect, disconnect, wallets = [] } = useWallet();

    const formatAddress = (addr: any) => {
        const addressStr = typeof addr === 'string' ? addr : addr.toString();
        return `${addressStr.slice(0, 6)}...${addressStr.slice(-4)}`;
    };

    if (account) {
        return (
            <Button onClick={() => disconnect()} variant="default" className="gap-2">
                <span className="w-2 h-2 rounded-full bg-green-300"></span>
                {formatAddress(account.address)}
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                    Connect Wallet
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {wallets.map((wallet) => (
                    <DropdownMenuItem
                        key={wallet.name}
                        onClick={() => connect(wallet.name)}
                    >
                        {wallet.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
```

**Features:**
- Dropdown menu for wallet selection
- Address formatting with ellipsis
- Green indicator when connected
- Disconnect functionality
- Automatic wallet detection

## Usage in Components

### Basic Wallet Usage

```typescript
import { useWallet } from "@aptos-labs/wallet-adapter-react";

function MyComponent() {
    const { account, connected, signAndSubmitTransaction } = useWallet();
    
    if (!connected || !account) {
        return <div>Please connect your wallet</div>;
    }
    
    return (
        <div>
            <p>Connected: {account.address}</p>
            {/* Your component logic */}
        </div>
    );
}
```

### Transaction Handling

```typescript
const handleTransaction = async () => {
    if (!connected || !account || typeof signAndSubmitTransaction !== 'function') {
        console.error("Wallet not properly connected");
        return;
    }
    
    try {
        const result = await signAndSubmitTransaction(transactionPayload);
        console.log("Transaction successful:", result);
    } catch (error) {
        console.error("Transaction failed:", error);
    }
};
```

## Troubleshooting

### Common Issues and Solutions

#### 1. "Cannot use 'in' operator to search for 'function' in undefined"

**Cause:** Wallet adapter trying to detect wallets before they're properly initialized.

**Solution:** 
- Set `autoConnect={false}` in the wallet provider
- Remove `optInWallets` array to allow automatic detection
- Ensure wallet extensions are properly installed

#### 2. "Could not establish connection. Receiving end does not exist."

**Cause:** Wallet extension not installed or not properly detected.

**Solution:**
- Install Petra wallet extension
- Refresh the page after installation
- Check browser console for wallet detection logs

#### 3. Wallet Not Appearing in Dropdown

**Cause:** Wallet not detected by the adapter.

**Solution:**
- Ensure wallet extension is installed and enabled
- Check if wallet supports the Aptos Wallet Standard
- Refresh the page and try reconnecting

#### 4. Transaction Failures

**Cause:** Incorrect transaction payload or insufficient funds.

**Solution:**
- Verify transaction payload structure
- Check account balance
- Ensure proper network configuration (testnet/mainnet)

### Debug Logging

The implementation includes comprehensive debug logging:

```typescript
useEffect(() => {
    console.log("=== WALLET DEBUG ===");
    console.log("Connected:", connected);
    console.log("Account:", account);
    console.log("signAndSubmitTransaction:", typeof signAndSubmitTransaction);
    console.log("Available wallets:", wallets);
    console.log("====================");
}, [connected, account, signAndSubmitTransaction, wallets]);
```

## Dependencies

### Required Packages

```json
{
  "@aptos-labs/ts-sdk": "^2.0.1",
  "@aptos-labs/wallet-adapter-react": "^3.6.2",
  "react": "^19",
  "react-dom": "^19"
}
```

### Installation

```bash
npm install @aptos-labs/ts-sdk @aptos-labs/wallet-adapter-react
npm install --save-dev typescript @types/react @types/node --legacy-peer-deps
```

## Best Practices

### 1. Error Handling

Always wrap wallet operations in try-catch blocks:

```typescript
try {
    await connect(walletName);
} catch (error) {
    console.error("Connection failed:", error);
    // Show user-friendly error message
}
```

### 2. State Management

Use the wallet state to conditionally render UI:

```typescript
{account ? (
    <div>Connected: {account.address}</div>
) : (
    <div>Please connect your wallet</div>
)}
```

### 3. Transaction Validation

Always validate wallet state before transactions:

```typescript
if (!connected || !account || typeof signAndSubmitTransaction !== 'function') {
    throw new Error("Wallet not properly connected");
}
```

### 4. User Feedback

Provide clear feedback for wallet operations:

```typescript
const [isConnecting, setIsConnecting] = useState(false);

const handleConnect = async () => {
    setIsConnecting(true);
    try {
        await connect(walletName);
    } catch (error) {
        // Handle error
    } finally {
        setIsConnecting(false);
    }
};
```

## Network Configuration

### Testnet Setup

```typescript
dappConfig={{ network: Network.TESTNET }}
```

### Mainnet Setup

```typescript
dappConfig={{ network: Network.MAINNET }}
```

## Security Considerations

1. **Never store private keys** in the frontend
2. **Validate all user inputs** before creating transactions
3. **Use proper error handling** to prevent information leakage
4. **Implement rate limiting** for wallet operations
5. **Test thoroughly** on testnet before mainnet deployment

## Testing

### Manual Testing Checklist

- [ ] Wallet extension installation
- [ ] Wallet connection flow
- [ ] Address display and formatting
- [ ] Disconnect functionality
- [ ] Transaction signing
- [ ] Error handling
- [ ] Network switching
- [ ] Auto-reconnection

### Automated Testing

Consider implementing tests for:
- Wallet connection states
- Transaction payload validation
- Error handling scenarios
- UI state management

## References

- [Aptos Wallet Adapter Documentation](https://github.com/aptos-labs/aptos-wallet-adapter)
- [AppreciateOnAptos Reference Implementation](https://github.com/jishnu-baruah/AppreciateOnAptos)
- [Aptos Wallet Standard](https://github.com/aptos-labs/aptos-wallet-standard)
- [Petra Wallet Documentation](https://petra.app/docs) 