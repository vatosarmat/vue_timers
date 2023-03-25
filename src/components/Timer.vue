<template>
  <component
    :is="props.tag"
    :class="{
      'component-card': true,
      [$style.root]: true,
      ...highlightStyle,
    }"
  >
    <div :class="$style.display">{{ displayDurationFormatted }}</div>
    <div :class="$style.buttons">
      <IconButton :class="highlightStyle" @click="onPauseClick" v-if="isActive">
        <Pause />
      </IconButton>
      <IconButton :class="highlightStyle" @click="onRunClick" v-else>
        <Triangle />
      </IconButton>
      <IconButton :class="highlightStyle" @click="onResetClick">
        <Square />
      </IconButton>
    </div>
  </component>
</template>

<script setup lang="ts">
import { ref, useCssModule, computed } from 'vue'
import { useRafFn } from '@vueuse/core'

import IconButton from './controls/IconButton.vue'
import Triangle from './icons/Triangle.vue'
import Pause from './icons/Pause.vue'
import Square from './icons/Square.vue'

const props = withDefaults(
  defineProps<{
    tag: 'div' | 'li'
  }>(),
  {
    tag: 'div',
  }
)

const runMoment = ref<null | number>(null)
const collectedDuration = ref(0)
const displayDuration = ref(0)

const style = useCssModule()
const { pause, resume, isActive } = useRafFn(
  () => {
    if (runMoment.value !== null) {
      displayDuration.value = Date.now() - runMoment.value + collectedDuration.value
    }
  },
  { immediate: false }
)

const highlightStyle = computed(() => {
  return { [style.highlighted]: isActive.value }
})

const durationFormat = (duration: number) => {
  const hour = 60 * 60 * 1000
  const minute = 60 * 1000
  const second = 1000
  let totalMs = duration
  let outputStr = ''

  const milliseconds = totalMs % second
  totalMs -= milliseconds

  const seconds = (totalMs % minute) / second
  totalMs -= seconds * second
  if (totalMs > 0) {
    outputStr = seconds.toString().padStart(2, '0')
  } else {
    return seconds
  }

  const minutes = (totalMs % hour) / minute
  totalMs -= minutes * minute
  if (totalMs > 0) {
    outputStr = `${minutes.toString().padStart(2, '0')}:${outputStr}`
  } else {
    return `${minutes}:${outputStr}`
  }

  const hours = totalMs / hour
  return `${hours}:${outputStr}`
}

const displayDurationFormatted = computed(() => durationFormat(displayDuration.value))

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

  font-family: Gotham Pro;
  font-weight: 400;
  font-size: 22px;
}

.root {
  color: map-get($palette, gray, button);

  .display {
    border-color: map-get($palette, gray, button);
  }
}

.root.highlighted {
  .display {
    color: map-get($palette, gray, white);
    border-color: map-get($palette, gray, white);
  }

  .highlighted {
    color: map-get($palette, gray, white);
  }
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
