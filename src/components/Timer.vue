<template>
  <div :class="$style.root">
    <div :class="$style.display">1:20:36</div>
    <div :class="$style.buttons">
      <IconButton v-if="isRunning">
        <Pause />
      </IconButton>
      <IconButton v-else>
        <Triangle />
      </IconButton>
      <IconButton>
        <Square />
      </IconButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconButton from './controls/IconButton.vue'
import Triangle from './icons/Triangle.vue'
import Pause from './icons/Pause.vue'
import Square from './icons/Square.vue'
import { ref } from 'vue'

const isRunning = ref(false)
</script>

<style module lang="scss">
.root {
  display: flex;
  flex-direction: column;
  width: map-get($layout, block, width);
  height: map-get($layout, block, height);
  background-color: map-get($palette, gray, timerBg);
}
.display {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-bottom: solid 1px;
  border-color: map-get($palette, gray, white);
  color: map-get($palette, gray, white);
}
.buttons {
  flex-grow: 1;
  display: flex;
  gap: map-get($layout, spacing) * 8;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
