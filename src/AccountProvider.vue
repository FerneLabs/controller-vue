<script setup lang="ts">
import type { Policy } from '@cartridge/controller'
import { useAccountProvider } from './AccountProvider'

interface Props {
  keychainUrl: string
  policies: Policy[]
  redirectUri: string
  rpcUrl: string
  network: string
}

const props = defineProps<Props>()

console.log('inside account provider')
useAccountProvider(props)
</script>

<template>
  <slot />
</template>
