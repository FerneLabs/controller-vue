<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useAccount } from '../providers/AccountProvider'
import ConnectionModal from './ConnectionModal.vue'
import WebGLContainer from './WebGLContainer.vue'
import { execTransaction } from '@/execTransaction'

const context = useAccount()
const isModalOpen = ref(false)
const isWebGLReady = ref(false)

const handleWebGLMessage = async (method: string, payload?: string) => {
  const parsedPayload = payload ? JSON.parse(payload) : null

  if (method === 'WebGLLog') {
    console.log(`[WebGL Log] ${parsedPayload}`)
    return
  }

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
    if (!context.username) return
    execTransaction(context, 'create_player', [context.username])
  }

  if (method === 'ExecuteCreateGame') {
    execTransaction(context, 'create_game', [])
  }

  if (method === 'ExecuteEndGame') {
    execTransaction(context, 'end_game', [])
  }
}

const handleAccountChange = () => {
  if (!isWebGLReady.value) return
  console.log(`[ControllerVue] Account changed`, context.accountStorage)

  if (!context.accountStorage) {
    window.VueMessage('UnregisterAccount')
  } else {
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
