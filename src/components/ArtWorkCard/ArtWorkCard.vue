<script setup>
const props = defineProps({
  artWork: Object
});

const emit = defineEmits(["open-modal"]);

const openModal = () => {
  emit("open-modal", props.artWork);
};
</script>

<template>
  <div class="artwork-card" @click="openModal">
    <img :src="artWork.webImage.url" alt="" />
    <h2 class="title">{{ artWork.title }}</h2>
  </div>
</template>

<style lang="scss" scoped>
@import "./ArtWorkCard.scss";
</style>
