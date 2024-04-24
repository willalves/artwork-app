<script setup>
import { onClickOutside } from "@vueuse/core";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import axios from "axios";
import { X } from "lucide-vue-next";

const props = defineProps({
  modalData: Object,
  isOpen: Boolean
});

const emit = defineEmits(["close-modal"]);

const clickTarget = ref(null);
const artWorkId = props.modalData.id;
const artWorkSingle = ref(null);

const closeModal = () => {
  artWorkSingle.value = null;
  emit("close-modal");
};

onClickOutside(clickTarget, closeModal);

const fetchArtworkById = async () => {
  try {
    const response = await axios.get(
      `https://www.rijksmuseum.nl/api/nl/collection/${artWorkId}?key=xTQEfbFE`
    );
    artWorkSingle.value = response.data.artObject;
  } catch (error) {
    console.log("Error fetching data:", error);
    return null;
  }
};

onMounted(() => {
  fetchArtworkById();
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
        <button class="add-favorites">Add to favorites</button>
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
