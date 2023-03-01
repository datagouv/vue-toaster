<template>
  <div :style="spacingStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const BASE = 0.5; 
const props = withDefaults(defineProps<{
  top?: string | number,
  bottom?: string | number,
  left?: string | number,
  right?: string | number,
  vertical?: string | number,
  horizontal?: string | number,
}>(), {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  vertical: 0,
  horizontal: 0,
});

const spacingStyle = computed(() => {
  const top = Math.max(Number(props.top), Number(props.vertical)) * BASE
  const right = Math.max(Number(props.right), Number(props.horizontal)) * BASE
  const bottom = Math.max(Number(props.bottom), Number(props.vertical)) * BASE
  const left = Math.max(Number(props.left), Number(props.horizontal)) * BASE

  return `margin: ${top}rem ${right}rem ${bottom}rem ${left}rem;`
});
</script>
