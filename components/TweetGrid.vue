<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
  >
    <TweetCard v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" />
  </div>
</template>

<script setup>
import TweetCard from "@/components/TweetCard.vue";
const { tweets } = defineProps({
  tweets: {
    type: {
      id: String,
      user: {
        id: String,
        firstName: String,
        lastName: String,
      },
      content: String,
      created_at: String,
    },
    required: true,
  },
});
</script>
