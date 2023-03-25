<template>
  <div :class="$style.root">
    <Timer v-for="id in ids" :key="id" />
    <div className="card">
      <IconButton @click="onNewTimerClick"><Plus /></IconButton>
    </div>
  </div>
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
  grid-template-columns: repeat(3, auto);
  column-gap: map-get($layout, spacing) * 10;
  row-gap: map-get($layout, spacing) * 9;
  padding-top: map-get($layout, spacing) * 14 + 2px;
  padding-bottom: map-get($layout, spacing) * 14 + 2px;
}
</style>
