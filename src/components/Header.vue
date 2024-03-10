<script lang="ts" setup>
import { useColorMode } from '@vueuse/core'
import {Sun,Moon, SeparatorVertical} from 'lucide-vue-next'

import { Button } from '@/components/ui/button';

const mode = useColorMode();
function switchTheme() {
  mode.value = mode.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <div class="flex w-full px-4 py-2 items-center justify-between border-b border-b-border">
    <span class="flex gap-4">
      <a href="https://twir.app" target="_blank">Twir</a>
      <SeparatorVertical />
      <a href="/">Twitch Tokens Generator</a>
    </span>
    <Button @click="switchTheme">
      <Sun v-if="mode === 'dark'" />
      <Moon v-else />
    </Button>
  </div>
</template>