import { CartridgeSessionAccount } from "@cartridge/account-wasm/session";
import type { Policy } from "@cartridge/controller";

export interface AccountStorage {
    username: string;
    address: string;
    ownerGuid: string;
    transactionHash?: string;
    expiresAt: string;
}

export interface SessionSigner {
    privateKey: string;
    publicKey: string;
}

export interface AccountContextType {
    accountStorage?: AccountStorage;
    sessionSigner?: SessionSigner;
    account?: CartridgeSessionAccount;
    openConnectionPage: () => void;
    clearSession: () => void;
    address?: string;
    username?: string;
    keychainUrl?: string;
    redirectUri?: string;
    policies?: Policy[];
    rpc?: string;
    slot?: string;
    namespace?: string;
    network?: string;
}

export interface AccountProviderProps {
    keychainUrl: string;
    policies: Policy[];
    redirectUri: string;
    rpcUrl: string;
    network?: string;
}