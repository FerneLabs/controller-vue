<script setup lang="ts">
import { useAccount } from './AccountProvider'

const { address, username, openConnectionPage, clearSession } = useAccount()
</script>

<template>
  <main class="flex flex-col justify-center items-center h-full">
    <h1 class="text-3xl font-bold text-center mx-2 my-4">Vue + Controller Test</h1>

    <div class="flex flex-col justify-center items-center h-full" v-if="address">
      <p class="max-w-[90%] break-all">Account: {{ address }}</p>
      <p>Username: {{ username }}</p>
      <div class="flex justify-center items-center">
        <!-- <button @click="profile" class="link-highlight m-4 cursor-pointer text-lg">Profile</button> -->
        <button @click="clearSession" class="link-highlight m-4 cursor-pointer text-lg">
          Disconnect
        </button>
      </div>
    </div>

    <button @click="openConnectionPage" class="link-highlight m-4 cursor-pointer text-lg" v-else>
      Connect
    </button>
  </main>
</template>
