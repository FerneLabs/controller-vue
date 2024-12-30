<script setup lang="ts">
import AccountProvider from './AccountProvider.vue'
import { initOptions } from './ControllerUtils'
import ControllerVue from './ControllerVue.vue'
import { KEYCHAIN_URL, POLICIES, REDIRECT_URL } from './globals'

const options = initOptions()
</script>

<template>
  <AccountProvider
    :keychainUrl="KEYCHAIN_URL"
    :policies="POLICIES"
    :redirectUri="REDIRECT_URL"
    :rpcUrl="options.rpc"
    network="SLOT"
  >
    <ControllerVue />
  </AccountProvider>
</template>

<style>
#app {
  height: 100%;
}
</style>
