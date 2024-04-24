<script setup>
import { onClickOutside } from "@vueuse/core";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useArtwork } from "@/composables/useArtwork.js";
import { useFavoritesStore } from "@/stores/favorites.js";
import { X } from "lucide-vue-next";

const props = defineProps({
  modalData: Object,
  isOpen: Boolean
});

const emit = defineEmits(["close-modal"]);

const favoritesStore = useFavoritesStore();
const clickTarget = ref(null);
const favorites = favoritesStore.favorites;

const { fetchArtworkById, artWorkSingle } = useArtwork(props.modalData.objectNumber);

console.log("favorites", favorites);
console.log("artWorkSingle", artWorkSingle);

const closeModal = () => {
  artWorkSingle.value = null;
  emit("close-modal");
};

onClickOutside(clickTarget, closeModal);

const addToFavorites = (item) => {
  favoritesStore.addToFavorites(item);
};

const removeFromFavorites = (item) => {
  favoritesStore.removeFromFavorites(item);
};

const isFavorite = (item) => {
  return favoritesStore?.favorites?.some((fav) => fav.id === item.id);
};

onMounted(() => {
  fetchArtworkById();
  favoritesStore.loadFavorites();
  isFavorite(artWorkSingle);
});
</script>

<template>
  <div v-if="isOpen && artWorkSingle" class="modal-overlay">
    <div class="modal" ref="clickTarget">
      <div class="close-block">
        <button class="close-btn" @click="closeModal">
          <X />
        </button>
      </div>
      <div class="content-info">
        <img :src="artWorkSingle.webImage.url" :alt="artWorkSingle.title" />
        <div>
          <h2>{{ artWorkSingle.title }}</h2>
          <p>{{ artWorkSingle.description }}</p>
        </div>
      </div>
      <div class="artwork-actions">
        <button
          class="add-favorites"
          @click="addToFavorites(artWorkSingle)"
          v-if="!isFavorite(artWorkSingle)"
        >
          Add to favorites
        </button>
        <button class="add-favorites" @click="removeFromFavorites(artWorkSingle)" v-else>
          Remove from favorites
        </button>
        <RouterLink :to="{ name: 'artwork', params: { id: artWorkSingle.objectNumber } }">
          View Details
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./ArtWorkModal.scss";
</style>
