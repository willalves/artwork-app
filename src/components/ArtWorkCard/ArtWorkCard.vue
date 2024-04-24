<script setup>
defineProps({
  artWork: Object
});
</script>

<template>
  <div class="artwork-card">
    <img :src="artWork.webImage.url" alt="" />
    <h2 class="title">{{ artWork.title }}</h2>
  </div>
</template>

<style lang="scss" scoped>
@import "./ArtWorkCard.scss";
</style>
