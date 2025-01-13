<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useAccount } from '../providers/AccountProvider'
import ConnectionModal from './ConnectionModal.vue'
import WebGLContainer from './WebGLContainer.vue'
import { CONTRACT_ADDRESS } from '@/controllerData'
import type { JsCall } from '@cartridge/account-wasm'
import * as Dojo from '@dojoengine/torii-client'

const context = useAccount()
const isModalOpen = ref(false)
const isWebGLReady = ref(false)

const handleWebGLMessage = (method: string, payload?: string) => {
  const parsedPayload = payload ? JSON.parse(payload) : null
  console.log(`[ControllerVue] Got message: ${method}`, parsedPayload)

  if (method === 'WebGLReady') {
    isWebGLReady.value = true
    handleAccountChange()
  }

  if (method === 'OpenConnectionPage') {
    isModalOpen.value = true
  }

  if (method === 'ClearSession') {
    context.clearSession()
  }

  if (method === 'ExecuteCreatePlayer') {
    if (!context.username || !context.account) return
    const call: JsCall = {
      contractAddress: CONTRACT_ADDRESS,
      entrypoint: 'create_player',
      calldata: [Dojo.cairoShortStringToFelt(context.username)],
    }

    context.account
      ?.execute([call])
      .then(() => {
        window.VueMessage('PlayerCreated')
      })
      .catch((e) => {
        console.error(`Error while executing action create_player: ${e}`)
      })
  }
}

const handleAccountChange = () => {
  if (!isWebGLReady.value) return

  if (!context.accountStorage) {
    window.VueMessage('UnregisterAccount')
  } else {
    console.log(context)
    console.log(`[ControllerVue] Passing RPC: ${context.rpcUrl}`)
    window.VueMessage(
      'RegisterAccount',
      JSON.stringify({
        address: context.accountStorage.address,
        username: context.accountStorage.username,
        rpc: context.rpcUrl,
      }),
    )
  }
}

watch(() => context.accountStorage, handleAccountChange)
onMounted(() => (window.App = { handleWebGLMessage }))
onBeforeUnmount(() => (window.App = undefined))
</script>

<template>
  <main :class="`flex flex-col justify-center items-center h-screen bg-tmaBg`">
    <WebGLContainer />
    <ConnectionModal :isOpen="isModalOpen" :close="() => (isModalOpen = false)" />
  </main>
</template>
