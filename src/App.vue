<script setup>
import { RouterView } from "vue-router";
import NavBar from "@/components/NavBar/NavBar.vue";
import { ref } from "vue";

const favoritesCount = ref(0);
</script>

<template>
  <header>
    <NavBar :favorites-count="favoritesCount" />
  </header>

  <div class="page-wrapper">
    <RouterView />
  </div>
</template>

<style scoped>
.page-wrapper {
  margin-top: 60px;
}
</style>
