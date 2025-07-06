"use client";

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