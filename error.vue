<template>
  <NuxtLayout name="404">
    <div
      class="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white"
    >
      <div class="text-6xl font-extrabold mb-4">Oops! 😕</div>
      <div class="text-2xl mb-8">You've arrived here on error, boss.</div>
      <button
        class="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-gray-200 hover:text-blue-800 transform hover:-translate-y-1"
        @click="goBack"
      >
        Go Back 🔙
      </button>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => {
  router.back();
};
</script>
