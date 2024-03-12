<script lang="ts" setup>
import { useUrlSearchParams } from '@vueuse/core'
import { watch, ref } from 'vue';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { PasswordInput } from '@/components/ui/input'
import { useSecrets } from '@/composables/use-secrets';

const params = useUrlSearchParams('history')
const { clientId, clientSecret } = useSecrets();
const isDialogOpened = ref(false)
const error = ref('')

watch(params, (newParams) => {
  if (newParams.error || newParams.code) {
    isDialogOpened.value = true
  }

  if (newParams.error) {
    error.value = newParams.error as string
    return
  }
  if (typeof newParams.code !== 'string') return;

  fetchTokens(newParams.code)
}, { immediate: true })

const accessToken = ref('')
const refreshToken = ref('')
async function fetchTokens(code: string) {
  const params = new URLSearchParams({
    client_id: clientId.value,
    client_secret: clientSecret.value,
    grant_type: 'authorization_code',
    code,
    redirect_uri: window.location.origin,
  })
  const resp = await fetch(`https://id.twitch.tv/oauth2/token?${params}`, {
    method: 'POST',
    body: params.toString(),
  })

  const data = await resp.json()
  if ('message' in data) {
    error.value = data.message
    return
  }

  accessToken.value = data.access_token
  refreshToken.value = data.refresh_token
}

</script>

<template>
  <Dialog v-model:open="isDialogOpened" class="outline-none">
    <DialogContent class="sm:max-w-[800px] outline-none">
      <DialogHeader>
        <DialogTitle>Generated tokens</DialogTitle>
      </DialogHeader>
      <Alert v-if="error" variant="destructive">
        <AlertTitle>Error when fetching tokens</AlertTitle>
        <AlertDescription>
          {{ error }}
        </AlertDescription>
      </Alert>
      <div v-else class="flex flex-col gap-4">
        <div class="form-item">
          <span class="whitespace-nowrap">Access Token</span>
          <Skeleton v-if="!accessToken" class="w-full h-8 rounded-md"></Skeleton>
          <PasswordInput v-else v-model="accessToken" readonly></PasswordInput>
        </div>
        <div class="form-item">
          <span class="whitespace-nowrap">Refresh Token</span>
          <Skeleton v-if="!refreshToken" class="w-full h-8 rounded-md"></Skeleton>
          <PasswordInput v-else v-model="refreshToken" readonly></PasswordInput>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
.form-item {
  @apply flex gap-2 flex-nowrap flex-row items-center
}
</style>