<script setup>
import { useRoute } from "vue-router";
import { useArtwork } from "@/composables/useArtwork.js";
import { onMounted } from "vue";
import { ArrowLeft } from "lucide-vue-next";

const route = useRoute();
const { fetchArtworkById, artWorkSingle } = useArtwork(route.params.id);

onMounted(() => {
  fetchArtworkById();
});
</script>

<template>
  <div v-if="artWorkSingle" class="artwork-page">
    <div class="page-header">
      <router-link to="/" class="back-link"><ArrowLeft /></router-link>
    </div>
    <div class="page-content">
      <img :src="artWorkSingle.webImage.url" :alt="artWorkSingle.title" />
      <div class="info">
        <div class="content-desc">
          <h2>{{ artWorkSingle.title }}</h2>
          <p>{{ artWorkSingle.description }}</p>
          <div class="artwork-types">
            <h3>Artwork types</h3>
            <div class="object-types">
              <span v-for="objectTypes in artWorkSingle.objectTypes" :key="objectTypes">
                {{ objectTypes }}
              </span>
            </div>
          </div>
        </div>
        <div class="content-actions">
          <button class="add-favorites">Add to favorites</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<style scoped lang="scss">
@import "./ArtWorkViewStyles.scss";
</style>
