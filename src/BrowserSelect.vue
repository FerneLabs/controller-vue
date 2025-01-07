<script setup lang="ts">
import type { OpenLinkBrowser } from '@telegram-apps/sdk-vue'
import { useAccount } from './AccountProvider'

const context = useAccount()
const browserList: OpenLinkBrowser[] = ['chrome', 'firefox', 'opera', 'brave', 'samsung', 'kiwi']

const formatString = (str: string) => {
  // e.g. in: 'opera-mini'
  // e.g. out: 'Opera Mini'
  return str
    .replace('-', ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>

<template>
  <div
    v-for="browser in browserList"
    :key="browser"
    class="m-2 p-4 text-center rounded-md bg-tmaButton text-tmaButtonText w-32"
    @click="context.openConnectionPage(browser)"
  >
    {{ formatString(browser) }}
  </div>
</template>
