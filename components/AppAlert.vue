<template>
  <span>
    <slot />
  </span>
</template>

<script setup>
const { title } = defineProps({
  title: {
    type: String,
    required: true,
    default: "Hola",
  },
});
console.log({ title });
</script>
