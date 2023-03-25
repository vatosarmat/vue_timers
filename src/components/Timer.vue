<template>
  <div className="card">
    <div :class="$style.display">{{ displayDuration }}</div>
    <div :class="$style.buttons">
      <IconButton @click="onPauseClick" v-if="isActive">
        <Pause />
      </IconButton>
      <IconButton @click="onRunClick" v-else>
        <Triangle />
      </IconButton>
      <IconButton @click="onResetClick">
        <Square />
      </IconButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRafFn } from '@vueuse/core'

import IconButton from './controls/IconButton.vue'
import Triangle from './icons/Triangle.vue'
import Pause from './icons/Pause.vue'
import Square from './icons/Square.vue'

const runMoment = ref<null | number>(null)
const collectedDuration = ref(0)
const displayDuration = ref(0)

const { pause, resume, isActive } = useRafFn(
  () => {
    if (runMoment.value !== null) {
      displayDuration.value = Date.now() - runMoment.value + collectedDuration.value
    }
  },
  { immediate: false }
)

const onRunClick = () => {
  runMoment.value = Date.now()
  resume()
}

const onPauseClick = () => {
  pause()
  collectedDuration.value = displayDuration.value
  runMoment.value = null
}

const onResetClick = () => {
  pause()
  runMoment.value = null
  displayDuration.value = 0
  collectedDuration.value = 0
}
</script>

<style module lang="scss">
.display {
  width: 100%;
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
