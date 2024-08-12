<template>
  <div class="p-4">
    <div
      class="flex sm:items-center mb-2 gap-2 sm:flex-row flex-col items-start"
    >
      <input
        type="text"
        v-model="content"
        class="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/2 lg:w-1/3 h-auto"
        placeholder="Write a tweet..."
      />
      <button
        @click="createTweet"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Tweet
      </button>
    </div>
    <div
      class="flex sm:items-center mb-2 gap-2 sm:flex-row flex-col items-start"
    >
      <input
        v-model="searchKey"
        type="text"
        class="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/2 lg:w-1/3 h-auto"
        :placeholder="
          activeTab === 'tweets' ? 'Search tweets...' : 'Search users...'
        "
      />
      <button
        @click="toggleSortOrder"
        class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
      >
        {{ capitalizeFirstLetter(sortOrder) }}
      </button>
    </div>
    <div class="flex mb-4 gap-2">
      <button
        :class="{
          'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded':
            activeTab === 'tweets',
          'bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded':
            activeTab !== 'tweets',
        }"
        @click="activeTab = 'tweets'"
      >
        Tweets
      </button>
      <button
        :class="{
          'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded':
            activeTab === 'users',
          'bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded':
            activeTab !== 'users',
        }"
        @click="activeTab = 'users'"
      >
        Users
      </button>
    </div>
    <div v-if="loadingTweets || loadingUsers" class="text-center text-gray-500">
      Loading {{ activeTab }}...
    </div>
    <div v-else-if="activeTab === 'tweets' && tweets.length === 0">
      No tweets found
    </div>
    <div v-else-if="activeTab === 'users' && users.length === 0">
      No users found
    </div>
    <TweetGrid v-if="activeTab === 'tweets'" :tweets="tweets" />
    <UserGrid v-else :users="users" />
  </div>
</template>

<script setup>
import TweetGrid from "@/components/TweetGrid.vue";
import UserGrid from "@/components/UserGrid.vue";
import { useStore } from "vuex";
const store = useStore();
const tweets = computed(() => store.state.tweet.tweets);
const users = computed(() => store.state.user.users);
const loadingTweets = computed(() => store.state.tweet.loading);
const loadingUsers = computed(() => store.state.user.loading);
const sortOrder = ref("latest");
const activeTab = ref("tweets");
const searchKey = ref("");
const content = ref("");

definePageMeta({
  middleware: "auth",
});

const fetchProfileOrTweets = (activeTab, searchKey, orderBy, page) => {
  if (activeTab === "tweets") {
    store.dispatch("tweet/fetchTweets", {
      searchKey,
      orderBy,
    });
  } else {
    store.dispatch("user/fetchUsers", {
      searchKey,
      orderBy,
    });
  }
};
watch(
  [searchKey, sortOrder, activeTab],
  ([searchKeyNew, sortOrderNew, activeTabNew]) => {
    fetchProfileOrTweets(activeTabNew, searchKeyNew, sortOrderNew);
  },
  {
    immediate: true,
    deep: true,
  }
);

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === "latest" ? "oldest" : "latest";
};

const createTweet = () => {
  store.dispatch("tweet/createTweet", {
    content: content.value,
  });
  content.value = "";
  activeTab.value = "tweets";
};
</script>
