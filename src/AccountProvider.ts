import { ref, reactive, provide, inject, computed, onMounted } from 'vue';
import { useLaunchParams, cloudStorage, miniApp, openLink } from '@telegram-apps/sdk-vue';
import * as Dojo from '@dojoengine/torii-client';
import { CartridgeSessionAccount } from '@cartridge/account-wasm/session';
import type { AccountContextType, AccountProviderProps, AccountStorage, SessionSigner } from './types';
import type { Policy } from '@cartridge/account-wasm';

export function useAccountProvider({ keychainUrl, policies, redirectUri, rpcUrl, network }: AccountProviderProps) {
	const { initData } = useLaunchParams();

	const accountStorage = ref<AccountStorage | undefined>(undefined);
	const sessionSigner = ref<SessionSigner | undefined>(undefined);

	const initializeSession = async () => {
		const keys = await cloudStorage.getKeys();

		if (keys.includes('sessionSigner')) {
			const signer = await cloudStorage.getItem('sessionSigner');
			sessionSigner.value = JSON.parse(signer) as SessionSigner;
			return;
		}

		const privateKey = Dojo.signingKeyNew();
		const publicKey = Dojo.verifyingKeyNew(privateKey);
		const newSigner: SessionSigner = { privateKey, publicKey };

		await cloudStorage.setItem('sessionSigner', JSON.stringify(newSigner));
		sessionSigner.value = newSigner;
	};

	const loadStoredAccount = async () => {
		const account = await cloudStorage.getItem('account');
		if (!account) return;

		const parsedAccount = JSON.parse(account) as AccountStorage;
		if (!parsedAccount.address || !parsedAccount.ownerGuid || !parsedAccount.expiresAt) {
			await cloudStorage.deleteItem('account');
			return;
		}

		accountStorage.value = parsedAccount;
	};

	onMounted(() => {
		initializeSession();
		loadStoredAccount();

		if (initData?.startParam) {
			const cartridgeAccount = JSON.parse(atob(initData.startParam)) as AccountStorage;
			cloudStorage.setItem('account', JSON.stringify(cartridgeAccount));
			accountStorage.value = cartridgeAccount;
		}
	});

	const account = computed(() => {
		if (!accountStorage.value || !sessionSigner.value) return undefined;

		return CartridgeSessionAccount.new_as_registered(
			rpcUrl,
			sessionSigner.value.privateKey,
			accountStorage.value.address,
			accountStorage.value.ownerGuid,
			network
				? Dojo.cairoShortStringToFelt(network)
				: Dojo.cairoShortStringToFelt('SN_MAINNET'),
			{
				policies: policies as Policy[],
				expiresAt: Number(accountStorage.value.expiresAt)
			}
		);
	});

	const openConnectionPage = async () => {
		if (!sessionSigner.value) {
			const privateKey = Dojo.signingKeyNew();
			const publicKey = Dojo.verifyingKeyNew(privateKey);
			const newSigner: SessionSigner = { privateKey, publicKey };

			await cloudStorage.setItem('sessionSigner', JSON.stringify(newSigner));
			sessionSigner.value = newSigner;
			return;
		}

		const url = encodeURIComponent(
			`${keychainUrl}/session?public_key=${sessionSigner.value.publicKey}` +
			`&redirect_uri=${redirectUri}&redirect_query_name=startapp` +
			`&policies=${JSON.stringify(policies)}&rpc_url=${rpcUrl}`
		);

		openLink(url, { tryInstantView: false });
		miniApp.close();
	};

	const clearSession = async () => {
		await Promise.all([
			cloudStorage.deleteItem('sessionSigner'),
			cloudStorage.deleteItem('account'),
		]);
		sessionSigner.value = undefined;
		accountStorage.value = undefined;
	};
	console.log("providing");
	const context = reactive({
		accountStorage,
		sessionSigner,
		account,
		openConnectionPage,
		clearSession,
		address: computed(() => accountStorage.value?.address),
		username: computed(() => accountStorage.value?.username),
		keychainUrl,
		redirectUri,
		policies,
		rpcUrl
	})
	provide<AccountContextType>('accountContext', context);

	console.log("provided", context);
}

export function useAccount(): AccountContextType {
	const context = inject<AccountContextType>('accountContext');
	if (!context) {
		throw new Error('useAccount must be used within an AccountProvider');
	}
	return context;
}