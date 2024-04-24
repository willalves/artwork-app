<script setup>
import { Star } from "lucide-vue-next";
import { ref } from "vue";

const favoritesDropdown = ref(false);

const toggleFavoritesDropdown = () => {
  favoritesDropdown.value = !favoritesDropdown.value;
};
</script>

<template>
  <nav>
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/art-logo.png" alt="Logo" />
      </router-link>
    </div>
    <div class="favorites" @click="toggleFavoritesDropdown">
      <Star fill="#ffea00" stroke-width="1" /> 0
      <div class="favorites-dropdown" v-if="favoritesDropdown">
        <ul>
          <li>Item 1</li>
          <li>Item 1</li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@import "./NavBar.scss";
</style>
