<template>
  <section>
    <p :class="['text-red', $style.bold]">
      This page will be displayed at the /about route.
    </p>
    <NuxtLink to="/">Home</NuxtLink>
  </section>
</template>
<script setup lang="ts">
const colorRed = ref("violet");
definePageMeta({
  // pageTransition: { name: "rotate" },
  layoutTransition: { name: "layout" },
  layout: "red",
});
</script>
<style scoped module>
.text-red {
  color: v-bind(colorRed);
}
.bold {
  font-weight: bolder;
}
</style>
