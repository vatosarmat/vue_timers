<template>
  <button :class="$style.root">
    <slot />
  </button>
</template>

<script setup lang="ts">
//
</script>

<style module lang="scss">
.root {
  width: map-get($layout, button, width);
  height: map-get($layout, button, height);
  border: none;
  background-color: transparent;
  color: map-get($palette, gray, button);
}
</style>
