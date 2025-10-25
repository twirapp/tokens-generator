<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

import { apiScopes, chatScopes } from '../scopes'
import { useLocalStorage } from '@vueuse/core';
import { useSecrets } from '@/composables/use-secrets';
import { computed } from 'vue';
import { useToast } from '@/components/ui/toast';

const selectedScopes = useLocalStorage<string[]>('twir_tokens_generator_selected_scopes', [], {
  serializer: {
    read: JSON.parse,
    write: JSON.stringify,
  },
})

function selectAll() {
  selectedScopes.value = [...Object.keys(apiScopes), ...Object.keys(chatScopes)]
}

function deselectAll() {
  selectedScopes.value = []
}

function handleUpdateChecked(scope: string, state: boolean) {
  if (state) {
    selectedScopes.value.push(scope)
    return
  }

  selectedScopes.value = selectedScopes.value.filter(s => s !== scope)
}


const { clientId, clientSecret } = useSecrets();

const authLink = computed(() => {
  const scopes = selectedScopes.value.join('+')
  const link = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${clientId.value}&redirect_uri=${window.location.origin}&scope=${scopes}&force_verify=true`
  return link
})

function generateToken() {
  window.location.assign(authLink.value)
}

const { toast } = useToast();
async function copyLink() {
  await navigator.clipboard.writeText(authLink.value);
  toast({
    description: 'Copied',
    variant: 'default',
    duration: 1500,
  });
}
</script>

<template>
  <div class="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[50px]">
            Enable
          </TableHead>
          <TableHead>Scope</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell class="text-4xl text-center" colspan="3">
            Scopes
          </TableCell>
        </TableRow>
        <TableRow v-for="[scope, description] of Object.entries(apiScopes)" :key="scope">
          <TableCell>
            <Switch
              :checked="selectedScopes.includes(scope)"
              @update:checked="(newState) => handleUpdateChecked(scope, newState)"
            ></Switch>
          </TableCell>
          <TableCell>{{ scope }}</TableCell>
          <TableCell class="whitespace-pre-wrap">{{ description }}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell class="text-4xl text-center" colspan="3">
            Chat and PubSub scopes
          </TableCell>
        </TableRow>
        <TableRow v-for="[scope, description] of Object.entries(chatScopes)" :key="scope">
          <TableCell>
            <Switch
              :checked="selectedScopes.includes(scope)"
              @update:checked="(newState) => handleUpdateChecked(scope, newState)"
            ></Switch>
          </TableCell>
          <TableCell>{{ scope }}</TableCell>
          <TableCell>{{ description }}</TableCell>
        </TableRow>
      </TableBody>
      <TableCaption>
        <div class="flex gap-2 items-center justify-center mb-2">
          <Button @click="selectAll" variant="secondary">Select all</Button>
          <Button @click="deselectAll" variant="destructive">Deselect all</Button>
          <Button @click="copyLink" :disabled="!clientId || !clientSecret">Copy auth link</Button>
          <Button @click="generateToken" :disabled="!clientId || !clientSecret">Generate token</Button>
        </div>
      </TableCaption>
    </Table>
  </div>
</template>