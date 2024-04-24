<script setup>
import { Star, Trash2 } from "lucide-vue-next";
import { ref, computed } from "vue";
import { useFavoritesStore } from "@/stores/favorites.js";
import { onClickOutside } from "@vueuse/core";

const favoritesStore = useFavoritesStore();
favoritesStore.loadFavorites();

const favorites = favoritesStore.favorites;
const favoritesDropdown = ref(false);
const favoritesDropdownTarget = ref(null);

const toggleFavoritesDropdown = () => {
  favoritesDropdown.value = !favoritesDropdown.value;
};

const removeFromFavorites = (item) => {
  favoritesStore.removeFromFavorites(item);
  favoritesStore.loadFavorites();
};

const truncateString = (str) => {
  return str.length > 20 ? str.substring(0, 20) + "..." : str;
};

const favoritesCount = computed(() => favoritesStore.favorites.length);

onClickOutside(favoritesDropdownTarget, toggleFavoritesDropdown);
</script>

<template>
  <nav>
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/art-logo.png" alt="Logo" />
      </router-link>
    </div>
    <div class="favorites" @click="toggleFavoritesDropdown" v-if="favorites">
      <Star fill="#ffea00" stroke-width="1" /> {{ favoritesCount }}
      <div ref="favoritesDropdownTarget" class="favorites-dropdown" v-if="favoritesDropdown">
        <ul>
          <li v-for="fav in favoritesStore.favorites" :key="fav.id">
            <a :href="`/artwork/${fav.objectNumber}`" class="fav-link">
              <img :src="fav.webImage.url" :alt="fav.title" />
              {{ truncateString(fav.title) }}
            </a>
            <a class="remove-favorite" @click="removeFromFavorites(fav)">
              <Trash2 size="16" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@import "./NavBar.scss";
</style>
