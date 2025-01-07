<script setup lang="ts">
import { ref } from 'vue'
import { useAccount } from './AccountProvider'
import BrowserSelect from './BrowserSelect.vue'

const context = useAccount()
const isModalOpen = ref(false)
</script>

<template>
  <main :class="`flex flex-col justify-center items-center h-screen bg-tmaBg`">
    <h1 class="text-3xl font-bold text-center mx-2 my-4 text-tmaText">Vue + Controller Test</h1>

    <div class="flex flex-col justify-center items-center" v-if="context.address">
      <p :class="`max-w-[90%] break-all text-tmaText`">Account: {{ context.address }}</p>
      <p :class="`text-tmaText`">Username: {{ context.username }}</p>
      <div class="flex justify-center items-center">
        <!-- <button @click="profile" class="link-highlight m-4 cursor-pointer text-lg">Profile</button> -->
        <button
          @click="context.clearSession"
          class="p-4 cursor-pointer rounded-md bg-tmaButton text-tmaButtonText"
        >
          Disconnect
        </button>
      </div>
    </div>

    <div class="flex flex-col justify-center items-center" v-else>
      <div
        v-if="isModalOpen"
        class="fixed flex flex-col justify-center items-center w-10/12 h-[90vh] top-0 bg-tmaBg"
        @click="isModalOpen = false"
      >
        <p class="text-tmaText">Open with...</p>
        <BrowserSelect />
      </div>
      <button
        @click="isModalOpen = true"
        class="p-4 cursor-pointer rounded-md bg-tmaButton text-tmaButtonText"
      >
        Connect
      </button>
    </div>
  </main>
</template>
