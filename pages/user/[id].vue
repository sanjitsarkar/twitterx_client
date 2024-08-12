<template>
  <div class="max-w-2xl mx-auto mt-8 p-6 rounded-lg shadow-md">
    <h1 class="text-2xl font-semibold text-gray-800">User Profile</h1>
    <div v-if="userProfile" class="mt-6">
      <h2 class="text-xl font-medium text-gray-700">
        {{ userProfile.firstName }} {{ userProfile.lastName }}
      </h2>
      <p class="text-gray-600 mt-2">Email: {{ userProfile.email }}</p>
      <p class="text-gray-600 mt-1">
        Joined: {{ new Date(userProfile.created_at).toLocaleDateString() }}
      </p>
      <div class="flex sm:gap-2 sm:flex-row flex-col">
        <NuxtLink
          :to="`/followings/${userProfile.id}`"
          class="text-gray-600 mt-1"
        >
          {{ userProfile.followersCount }} Following
        </NuxtLink>
        <NuxtLink
          :to="`/followers/${userProfile.id}`"
          class="text-gray-600 mt-1"
        >
          {{ userProfile.followingCount }} Followers
        </NuxtLink>
      </div>
    </div>
    <div v-else class="mt-6 text-gray-600">
      <p>Loading user profile...</p>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const route = useRoute();
const store = useStore();
const userProfile = computed(() => store.state.user.userProfile);

definePageMeta({
  middleware: "auth",
});

onMounted(async () => {
  const userId = route.params.id;
  store.dispatch("user/fetchUserProfile", userId);
});
</script>
