import type { Policy } from "@cartridge/controller";
import { CartridgeSessionAccount } from "@cartridge/account-wasm/session";
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

export const CONTRACT_ADDRESS = '0x03cae44b2932cf573cad525396df80a09a6897aafc6b9cb2deb5e5b68e5e38e9';
export const KEYCHAIN_URL = "https://x.cartridge.gg";
export const REDIRECT_URL = "https://t.me/controller_test_tg_bot/controller";
export const POLICIES: Policy[] = [
    {
        target: CONTRACT_ADDRESS,
        method: 'create_player',
        description: 'Create a new player',
    },
    {
        target: CONTRACT_ADDRESS,
        method: 'create_game',
        description: 'Create a game',
    },
    {
        target: CONTRACT_ADDRESS,
        method: 'move',
        description: 'Move character inside level',
    },
    {
        target: CONTRACT_ADDRESS,
        method: 'end_game',
        description: 'End a game',
    },
]

