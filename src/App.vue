<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
import Secrets from '@/components/Secrets.vue';
import Header from '@/components/Header.vue'
import Scopes from '@/components/Scopes.vue'
import Callback from '@/components/Callback.vue'
</script>

<template>
  <Header></Header>
  <div class="container flex flex-col gap-4 py-10">
    <Secrets></Secrets>
    <Scopes></Scopes>
  </div>

  <Toaster></Toaster>
  <Callback></Callback>
</template>
