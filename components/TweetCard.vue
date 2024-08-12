<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg mb-4">
    <div class="px-6 py-4 pb-2">
      <p class="text-gray-700 text-base overflow-ellipsis overflow-hidden">
        {{ content }}
      </p>
      <div
        class="flex sm:items-center items-start justify-between mb-2 flex-col sm:flex-row"
      >
        <div class="flex items-center">
          <div class="text-gray-500 text-sm">
            By
            <NuxtLink :to="`/user/${user?.id}`"
              >{{ user?.firstName }} {{ user?.lastName }}</NuxtLink
            >
          </div>
        </div>
        <div class="text-gray-500 text-sm">
          Posted {{ datePostedAgo(new Date(created_at)) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["tweet"]);
const { user, content, created_at } = toRefs(props.tweet);
</script>
