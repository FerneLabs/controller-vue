<script setup lang="ts">
import { interceptConsole } from '@/interceptConsole'
</script>

<template>
  <iframe
    src="../game 2/index.html"
    class="w-screen h-screen"
    id="webglFrame"
    @load="interceptConsole"
  />
</template>
