<template>
  <NuxtLayout name="404">
    <div>
      <div class="text-4xl">You've Arrived Here on Error, boss</div>
      <button class="font-bold button" @click="goBack">Back</button>
      <button class="font-bold button" @click="$router.back()">Back</button>
    </div>
  </NuxtLayout>
</template>
<script setup>
const router = useRouter();
const goBack = () => {
  router.back();
};
</script>
