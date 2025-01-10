<script setup lang="ts">
import BrowserSelect from './BrowserSelect.vue'

interface Props {
  isOpen: boolean
  close: () => void
}

const { isOpen, close } = defineProps<Props>()
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed flex flex-col justify-center items-center w-screen h-screen"
    @click="close"
  >
    <div class="flex flex-col justify-center items-center w-10/12 bg-tmaBg p-8">
      <p class="text-tmaText">Open with...</p>
      <BrowserSelect />
    </div>
  </div>
</template>
