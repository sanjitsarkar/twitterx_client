<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Followings</h1>
    <div
      class="flex sm:items-center mb-2 gap-2 sm:flex-row flex-col items-start"
    >
      <input
        v-model="searchKey"
        type="text"
        class="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/2 lg:w-1/3 h-auto"
        placeholder="Search followings..."
      />
      <button
        @click="toggleSortOrder"
        class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
      >
        {{ capitalizeFirstLetter(sortOrder) }}
      </button>
    </div>
    <div class="flex flex-col md:flex-row justify-between gap-2">
      <div v-if="isLoading">
        <p class="text-gray-600">Loading followings...</p>
      </div>
      <div v-else-if="followings.length === 0" class="w-full">
        <p class="text-gray-600">No followings found.</p>
      </div>
      <div v-else class="md:w-1/2 mb-8 md:mb-0">
        <ul>
          <li
            v-for="following in followings"
            :key="following.id"
            class="border-b py-4"
          >
            <NuxtLink
              :to="`/user/${following.following?.id}`"
              class="font-medium"
            >
              {{ following.following?.firstName }}
              {{ following.following?.lastName }}
            </NuxtLink>
            <p class="text-gray-600">{{ following.following?.email }}</p>
          </li>
        </ul>
        <div ref="sentinel" class="h-1"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ref, computed, watch } from "vue";

const store = useStore();
const route = useRoute();
const followings = computed(() => store.state.follow.following);
const isLoading = computed(() => store.state.follow.loading);
const sortOrder = ref("latest");
const searchKey = ref("");
const userId = computed(() => route.params?.id);

definePageMeta({
  middleware: "auth",
});

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === "latest" ? "oldest" : "latest";
};

watch(
  [searchKey, sortOrder],
  ([searchKeyNew, sortOrderNew]) => {
    store.dispatch("follow/getFollowings", {
      searchKey: searchKeyNew,
      sortOrder: sortOrderNew,
      userId: userId.value,
    });
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
