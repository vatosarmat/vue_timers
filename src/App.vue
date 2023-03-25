<template>
  <ul :class="$style.root">
    <Timer tag="li" v-for="id in ids" :key="id" />
    <div className="component-card">
      <IconButton @click="onNewTimerClick"><Plus /></IconButton>
    </div>
  </ul>
</template>

<script setup lang="ts">
import Timer from './components/Timer.vue'
import IconButton from './components/controls/IconButton.vue'
import Plus from './components/icons/Plus.vue'

import { ref } from 'vue'

const nextId = ref(1)
const ids = ref<number[]>([])

const onNewTimerClick = () => {
  ids.value.push(nextId.value++)
}
</script>

<style module lang="scss">
.root {
  display: grid;
  justify-content: center;
  column-gap: map-get($layout, spacing) * 10;
  row-gap: map-get($layout, spacing) * 9;
  padding-top: map-get($layout, spacing) * 14 + 2px;
  padding-bottom: map-get($layout, spacing) * 14 + 2px;

  grid-template-columns: auto;
}

@media (width >= 768px) {
  .root {
    grid-template-columns: repeat(2, auto);
  }
}

@media (width >= 1024px) {
  .root {
    grid-template-columns: repeat(3, auto);
  }
}
</style>
