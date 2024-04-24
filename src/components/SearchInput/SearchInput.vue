<script setup>
import { ref } from "vue";
import { watchDebounced } from "@vueuse/core";
import { Search } from "lucide-vue-next";

const searchInput = ref("");
const emit = defineEmits(["search"]);

watchDebounced(
  searchInput,
  () => {
    emit("search", searchInput);
  },
  { debounce: 1000, maxWait: 5000 }
);
</script>

<template>
  <div class="search-box">
    <input type="text" v-model="searchInput" placeholder="Search..." />
    <span @click="searchInput = ''" class="clear-search" v-if="searchInput">+</span>
    <div class="search-icon"><Search :size="18" /></div>
  </div>
</template>

<style scoped lang="scss">
@import "./SearchInput.scss";
</style>
