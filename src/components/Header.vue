<script lang="ts" setup>
import { useColorMode } from '@vueuse/core'
import {Sun,Moon} from 'lucide-vue-next'

import { Button } from '@/components/ui/button';

const mode = useColorMode();
function switchTheme() {
  mode.value = mode.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <div class="flex w-full px-4 py-2 items-center justify-between border-b border-b-border">
    <a href="https://twir.app">Twitch token generator</a>
    <Button @click="switchTheme">
      <Sun v-if="mode === 'dark'" />
      <Moon v-else />
    </Button>
  </div>
</template>