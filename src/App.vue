<template>
  <div :class="$style.root">
    <Timer />
    <Timer />
    <Timer />
  </div>
</template>

<script setup lang="ts">
import Timer from './components/Timer.vue'
</script>

<style module lang="scss">
.root {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, auto);
  column-gap: map-get($layout, spacing) * 10;
  row-gap: map-get($layout, spacing) * 9;
  padding-top: map-get($layout, spacing) * 14 + 2px;
  padding-bottom: map-get($layout, spacing) * 14 + 2px;
  background-color: map-get($palette, gray, black);
}
</style>
