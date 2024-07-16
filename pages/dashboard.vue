<template>
  <h1>Welcome to the Dashboard!</h1>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>

<style lang="scss" scoped></style>
