import type { Policy, ControllerOptions } from '@cartridge/controller'

const actions_contract_address =
	'0x03cae44b2932cf573cad525396df80a09a6897aafc6b9cb2deb5e5b68e5e38e9'
const policies: Policy[] = [
	{
		target: actions_contract_address,
		method: 'create_player',
		description: 'Create a new player',
	},
	{
		target: actions_contract_address,
		method: 'create_game',
		description: 'Create a game',
	},
	{
		target: actions_contract_address,
		method: 'move',
		description: 'Move character inside level',
	},
	{
		target: actions_contract_address,
		method: 'end_game',
		description: 'End a game',
	},
]

export const initOptions = (): ControllerOptions => {
	const projectName = import.meta.env.VITE_DEV ? 'dod-dev' : 'dod'
	console.log(`init with ${projectName} || ${import.meta.env.VITE_DEV}`);
	return {
		slot: projectName,
		namespace: 'depths_of_dread',
		policies: policies,
		rpc: `https://api.cartridge.gg/x/${projectName}/katana`,
	}
}
