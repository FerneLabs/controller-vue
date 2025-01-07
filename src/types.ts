import { CartridgeSessionAccount } from "@cartridge/account-wasm/session";
import type { Policy } from "@cartridge/controller";
import type { OpenLinkBrowser } from "@telegram-apps/sdk-vue";

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
    openConnectionPage: (browser: OpenLinkBrowser) => void;
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