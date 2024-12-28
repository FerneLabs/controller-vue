<script setup lang="ts">
import Controller from '@cartridge/controller'
import type { AccountInterface } from 'starknet'
import { ref, onMounted } from 'vue'
import { initOptions } from './ControllerUtils'

const account = ref<AccountInterface | undefined>()
const username = ref<string | undefined>()
const controller = new Controller(initOptions())

const connect = async () => {
  const response = await controller.connect()
  if (response) {
    account.value = response
    username.value = await controller.username()
  }
}

const profile = () => {
  controller.openProfile()
}

const disconnect = async () => {
  await controller.disconnect()
  account.value = undefined
  username.value = undefined
}

onMounted(async () => {
  if (await controller.probe()) {
    await connect()
  }
})
</script>

<template>
  <main class="flex flex-col justify-center items-center h-full">
    <h1 class="text-3xl font-bold text-center mx-2 my-4">Vue + Controller Test</h1>

    <div class="flex flex-col justify-center items-center h-full" v-if="account">
      <p class="max-w-[90%] break-all">Account: {{ account.address }}</p>
      <p>Username: {{ username }}</p>
      <div class="flex justify-center items-center">
        <button @click="profile" class="link-highlight m-4 cursor-pointer text-lg">Profile</button>
        <button @click="disconnect" class="link-highlight m-4 cursor-pointer text-lg">
          Disconnect
        </button>
      </div>
    </div>

    <button @click="connect" class="link-highlight m-4 cursor-pointer text-lg" v-else>
      Connect
    </button>
  </main>
</template>

<style>
#app {
  height: 100%;
}
</style>
