<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg mb-4">
    <div class="px-6 py-4 pb-2">
      <div
        class="flex items-center sm:items-start justify-between mb-2 flex-row sm:flex-col"
      >
        <div class="flex items-center gap-2">
          <p class="text-gray-700 text-base overflow-ellipsis overflow-hidden">
            <NuxtLink :to="`/user/${user?.id}`"
              >{{ firstName }} {{ lastName }}</NuxtLink
            >
          </p>
          <button
            @click="handleFollow"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-sm text-xs"
          >
            {{
              isFollowing ? "Unfollow" : isFollower ? "Follow Back" : "Follow"
            }}
          </button>
        </div>
        <div class="text-gray-500 text-sm mt-2">
          Joined {{ datePostedAgo(new Date(created_at)) }} ago
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore();
const props = defineProps(["user"]);
const { firstName, lastName, created_at, isFollower, isFollowing, id } = toRefs(
  props.user
);
const handleFollow = () => {
  if (isFollowing) {
    // Unfollow user
    store.dispatch("follow/followUser", id.value);
  } else {
    store.dispatch("follow/unfollowUser", id.value);
    // Follow user
  }
};
</script>
