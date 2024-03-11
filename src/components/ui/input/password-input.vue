<script lang="ts" setup>
import { Eye, Copy } from 'lucide-vue-next'

import { useToast } from '@/components/ui/toast/use-toast'
import { Button } from '@/components/ui/button'
import Input from './Input.vue';
import { ref } from 'vue';

const value = defineModel<string>({ required: true })
const type = ref('password')
const { toast } = useToast()

defineProps<{
  readonly?: boolean
}>()

function switchType() {
  type.value = type.value === 'password' ? 'text' : 'password'
}

async function copy() {
  if (!value.value) return;

  await navigator.clipboard.writeText(value.value);
  toast({
    description: 'Copied',
    variant: 'default',
    duration: 1500,
  });
}

</script>

<template>
  <div class="relative w-full items-center">
    <Input :type class="pr-10 outline-none" v-model="value" autocomplete="off" :readonly />

    <div class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
      <Button @click="switchType" size="icon" variant="ghost">
        <Eye class="size-4 text-muted-foreground" />
      </Button>
      <Button @click="copy" size="icon" variant="ghost">
        <Copy class="size-4 text-muted-foreground" />
      </Button>
    </div>
  </div>
</template>