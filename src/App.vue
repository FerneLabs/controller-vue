<script setup lang="ts">
import AccountProvider from './providers/AccountProvider.vue'
import ControllerVue from './components/ControllerVue.vue'
import { KEYCHAIN_URL, POLICIES, REDIRECT_URL } from './controllerData'
import type { ControllerOptions } from '@cartridge/controller'

const projectName = import.meta.env.VITE_DEV ? 'dod-dev' : 'dod'
// const options: ControllerOptions = {
//   slot: projectName,
//   namespace: 'depths_of_dread',
//   // rpc: `https://api.cartridge.gg/x/${projectName}/katana`,
//   colorMode: 'dark',
// }
</script>

<template>
  <AccountProvider
    :keychainUrl="KEYCHAIN_URL"
    :policies="POLICIES"
    :redirectUri="REDIRECT_URL"
    :rpcUrl="`https://api.cartridge.gg/x/${projectName}/katana`"
    network="SLOT"
  >
    <ControllerVue />
  </AccountProvider>
</template>
