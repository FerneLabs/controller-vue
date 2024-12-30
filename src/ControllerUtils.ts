import type { Policy, ControllerOptions } from '@cartridge/controller'

const actions_contract_address =
	'0x03cae44b2932cf573cad525396df80a09a6897aafc6b9cb2deb5e5b68e5e38e9'


export const initOptions = (): ControllerOptions => {
	const projectName = import.meta.env.VITE_DEV ? 'dod-dev' : 'dod'
	console.log(`init with ${projectName} || ${import.meta.env.VITE_DEV}`);
	return {
		slot: projectName,
		namespace: 'depths_of_dread',
		rpc: `https://api.cartridge.gg/x/${projectName}/katana`,
		colorMode: 'dark',
	}
}
