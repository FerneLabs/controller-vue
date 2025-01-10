<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useAccount } from '../providers/AccountProvider'
import ConnectionModal from './ConnectionModal.vue'
import WebGLContainer from './WebGLContainer.vue'

const context = useAccount()
const isModalOpen = ref(false)

const handleWebGLMessage = (method: string, payload?: string) => {
  const parsedPayload = payload ? JSON.parse(payload) : null

  if (method === 'openConnectionPage') {
    isModalOpen.value = true
  }

  if (method === 'clearSession') {
    context.clearSession()
  }
}

const handleAccountChange = () => {
  if (!context.accountStorage) {
    window.VueMessage('UnregisterAccount')
  } else {
    window.VueMessage(
      'RegisterAccount',
      JSON.stringify({
        address: context.accountStorage.address,
        username: context.accountStorage.username,
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
