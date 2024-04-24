<script setup></script>

<template>
  <div class="loading-skeleton">
    <div class="loading-skeleton__item"></div>
    <div class="loading-skeleton__item"></div>
    <div class="loading-skeleton__item"></div>
    <div class="loading-skeleton__item"></div>
    <div class="loading-skeleton__item"></div>
    <div class="loading-skeleton__item"></div>
    <div class="loading-skeleton__item"></div>
    <div class="loading-skeleton__item"></div>
    <div class="loading-skeleton__item"></div>
    <div class="loading-skeleton__item"></div>
    <div class="loading-skeleton__item"></div>
    <div class="loading-skeleton__item"></div>
  </div>
</template>

<style scoped>
.loading-skeleton {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
}

.loading-skeleton__item {
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  aspect-ratio: 1/1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #e2e2e2;
}

@keyframes loading-animation {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}

.loading-skeleton__item {
  animation: loading-animation 1s infinite;
}
</style>
