<script setup>
import { onClickOutside } from "@vueuse/core";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useArtwork } from "@/composables/useArtwork.js";
import { X } from "lucide-vue-next";

const props = defineProps({
  modalData: Object,
  isOpen: Boolean
});

const emit = defineEmits(["close-modal"]);

const { fetchArtworkById, artWorkSingle } = useArtwork(props.modalData.objectNumber);

const clickTarget = ref(null);

const closeModal = () => {
  artWorkSingle.value = null;
  emit("close-modal");
};

onClickOutside(clickTarget, closeModal);

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
