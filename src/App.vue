<script setup>
import { RouterView } from "vue-router";
import NavBar from "@/components/NavBar/NavBar.vue";
</script>

<template>
  <header>
    <NavBar />
  </header>

  <div class="page-wrapper">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.page-wrapper {
  margin-top: 60px;
}
</style>
