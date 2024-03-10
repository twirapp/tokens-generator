<script setup lang="ts">
import { PasswordInput } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useSecrets } from '@/composables/use-secrets';

const { clientId, clientSecret } = useSecrets();

function reset() {
  clientId.value = ''
  clientSecret.value = ''
}

const redirectLink = window.location.origin
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Applications secrets</CardTitle>
      <CardDescription class="flex flex-col">
        <span>
          Your twitch clientId and clientSecret. Note, we are not storing your data on our servers, local storage of browser used instead.
        </span>
        <span>
          You must set the redirect URL for your TwitchDev application to: <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">{{ redirectLink }}</code>
        </span>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex flex-col gap-4">
        <div class="form-item">
          <span class="whitespace-nowrap">Client id</span>
          <PasswordInput
            v-model="clientId"
            type="password"
          />
        </div>
        <div class="form-item">
          <span class="whitespace-nowrap">Client secret</span>
          <PasswordInput
            v-model="clientSecret"
            type="password"
          />
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button @click="reset">Reset</Button>
    </CardFooter>
  </Card>
</template>

<style scoped>
.form-item {
  @apply flex gap-2 flex-nowrap flex-row items-center
}
</style>