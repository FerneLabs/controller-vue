import { CONTRACT_ADDRESS } from '@/controllerData'
import type { JsCall } from '@cartridge/account-wasm'
import * as Dojo from '@dojoengine/torii-client'
import { errorHandler } from './errorHandler'

export const execTransaction = (
	context: AccountContextType,
	entryPoint: string,
	data: string[]
) => {
	if (!context.username || !context.account || !context.accountStorage) return

	const call: JsCall = {
		contractAddress: CONTRACT_ADDRESS,
		entrypoint: entryPoint,
		calldata: data.map(arg => Dojo.cairoShortStringToFelt(arg)),
	}

	console.log('[execTransaction] Running transaction...')
	const tx = context.account
		.execute([call])
		.then((tx) => {
			console.log('[execTransaction] Transaction ran:', tx)
			window.VueMessage('PlayerCreated')
		})
		.catch((e) => {
			console.error(`[execTransaction] Error while executing transaction ${entryPoint}: ${e}`)
			window.VueMessage('DisplayError', JSON.stringify({ message: `${e}` }))
		})

	return tx;
}