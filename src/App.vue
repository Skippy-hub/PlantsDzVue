<script setup>
  import { RouterView } from 'vue-router';
  import AppLayout from './layouts/AppLayout.vue';
</script>

<template>
  <main class="container">
    <AppLayout>
      <RouterView/>
    </AppLayout>
  </main>
</template>

<style scoped>
</style>
