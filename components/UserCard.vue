<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg mb-4">
    <div class="px-6 py-4 pb-2">
      <div
        class="flex items-center sm:items-start justify-between mb-2 flex-row sm:flex-col"
      >
        <div class="flex items-center gap-2">
          <p class="text-gray-700 text-base overflow-ellipsis overflow-hidden">
            <NuxtLink :to="`/user/${id}`"
              >{{ firstName }} {{ lastName }}</NuxtLink
            >
          </p>
          <button
            @click="handleFollow"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-sm text-xs"
          >
            {{
              isFollower ? "Unfollow" : isFollowing ? "Follow Back" : "Follow"
            }}
          </button>
        </div>
        <div class="text-gray-500 text-sm mt-2">Joined {{ postedAgo }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFollowStore } from "~/stores/follow";
import { useUserStore } from "~/stores/user";

const followStore = useFollowStore();
const userStore = useUserStore();

const { user } = defineProps({
  user: {
    type: {
      firstName: String,
      lastName: String,
      created_at: String,
      isFollower: Boolean,
      isFollowing: Boolean,
      id: String,
    },
    required: true,
  },
});

const { id, firstName, lastName, created_at, isFollower, isFollowing } = user;

const postedAgo = computed(() => {
  return datePostedAgo(new Date(created_at));
});

const handleFollow = async () => {
  if (isFollower) {
    await followStore.unfollowUser(id);
  } else {
    await followStore.followUser(id);
  }
  await userStore.fetchUsers();
};
</script>
