<script setup>
import { onMounted, ref, watch } from "vue";
import ArtWorkCard from "@/components/ArtWorkCard/ArtWorkCard.vue";
import ArtWorkModal from "@/components/ArtWorkModal/ArtWorkModal.vue";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton.vue";
import SearchInput from "@/components/SearchInput/SearchInput.vue";
import { useArtwork } from "@/composables/useArtwork.js";

const { fetchArtwork, searchArtwork, artWorks, currentPage, isLoading, loadingMore, isEmpty } =
  useArtwork();

const modalData = ref(null);
const isOpen = ref(false);

const openModal = (data) => {
  modalData.value = data;
  isOpen.value = true;
};

const loadMore = () => {
  currentPage.value++;
};

const closeModal = () => {
  modalData.value = null;
  isOpen.value = false;
};

onMounted(() => {
  fetchArtwork();
});

watch(currentPage, fetchArtwork);
</script>

<template>
  <div>
    <SearchInput v-on:search="searchArtwork" />
    <LoadingSkeleton v-if="isLoading" />
    <p v-else-if="isEmpty">No Artwork was found.</p>
    <div v-else-if="artWorks.length" class="list-wrapper">
      <div class="artWorks-list">
        <ArtWorkCard
          v-for="artWork in artWorks"
          :key="artWork.id"
          :artWork="artWork"
          @open-modal="openModal(artWork)"
        />
      </div>
      <div class="load-more">
        <button @click="loadMore">
          Load More
          <span v-if="loadingMore" class="spinner"></span>
        </button>
      </div>
    </div>
    <ArtWorkModal
      v-if="modalData"
      :isOpen="isOpen"
      :modalData="modalData"
      @close-modal="closeModal"
    />
  </div>
</template>

<style lang="scss">
@import "./ArtWorkList.scss";
</style>
