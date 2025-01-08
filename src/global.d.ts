import { CartridgeSessionAccount } from "@cartridge/account-wasm/session";
import type { OpenLinkBrowser } from "@telegram-apps/sdk-vue";
import type { Policy } from "@cartridge/controller";

export { };

declare global {
    interface Window {
        WebGLMessage?: (event: string, payload: string) => void;
        App?: {
            handleWebGLMessage?: (event: string, payload: any) => void;
        };
    }
    interface AccountStorage {
        username: string;
        address: string;
        ownerGuid: string;
        transactionHash?: string;
        expiresAt: string;
    }

    interface SessionSigner {
        privateKey: string;
        publicKey: string;
    }

    interface AccountContextType {
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

    interface AccountProviderProps {
        keychainUrl: string;
        policies: Policy[];
        redirectUri: string;
        rpcUrl: string;
        network?: string;
    }
}