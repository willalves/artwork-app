<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import ArtWorkCard from "@/components/ArtWorkCard/ArtWorkCard.vue";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton.vue";
import SearchInput from "@/components/SearchInput/SearchInput.vue";

const artWorks = ref([]);
const currentPage = ref(1);
const isLoading = ref(false);
const loadingMore = ref(false);
const isEmpty = ref(false);

const loadMore = () => {
  currentPage.value++;
};

const fetchArtwork = async () => {
  isLoading.value = artWorks.value.length ? false : true;
  loadingMore.value = true;
  try {
    const response = await axios.get(
      `https://www.rijksmuseum.nl/api/en/collection?key=xTQEfbFE&ps=12&p=${currentPage.value}`
    );
    artWorks.value = [...artWorks.value, ...response.data.artObjects];
  } catch (error) {
    console.log("Error fetching artworks: ", error);
  } finally {
    isLoading.value = false;
    loadingMore.value = false;
  }
};

const searchArtwork = async (searchInput) => {
  isLoading.value = true;
  isEmpty.value = false;
  try {
    const response = await axios.get(
      `https://www.rijksmuseum.nl/api/en/collection?key=xTQEfbFE&ps=12&p=${currentPage.value}&q=${searchInput.value}`
    );
    artWorks.value = response.data.artObjects;

    if (!artWorks.value.length) {
      isEmpty.value = true;
    }
  } catch (error) {
    console.log("Error searching artworks: ", error);
  } finally {
    isLoading.value = false;
  }
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
        <ArtWorkCard v-for="artWork in artWorks" :key="artWork.id" :artWork="artWork" />
      </div>
      <div class="load-more">
        <button @click="loadMore">
          Load More
          <span v-if="loadingMore" class="spinner"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "./ArtWorkList.scss";
</style>
