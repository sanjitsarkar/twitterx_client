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
        @input="onSearchKeyChange"
        type="text"
        class="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/2 lg:w-1/3 h-auto"
        :placeholder="searchPlaceholder"
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
        :class="`
          ${
            isActiveTab('tweets')
              ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded'
          }`"
        @click="setActiveTab('tweets')"
      >
        Tweets
      </button>
      <button
        :class="`
          ${
            isActiveTab('users')
              ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded'
          }`"
        @click="setActiveTab('users')"
      >
        Users
      </button>
    </div>
    <div v-if="isUsersOrTweetsLoading" class="text-center text-gray-500">
      Loading {{ activeTab }}...
    </div>
    <div v-else-if="isTweetsEmpty">No tweets found</div>
    <div v-else-if="isUsersEmpty">No users found</div>
    <TweetGrid v-if="isTweetsPresent" :tweets="tweets" />
    <UserGrid v-else-if="isUsersPresent" :users="users" />
  </div>
</template>

<script setup>
import TweetGrid from "@/components/TweetGrid.vue";
import UserGrid from "@/components/UserGrid.vue";
import { useTweetStore } from "~/stores/tweet";
import { useUserStore } from "~/stores/user";
import { storeToRefs } from "pinia";

const tweetStore = useTweetStore();
const userStore = useUserStore();

const { tweets, loading: loadingTweets } = storeToRefs(tweetStore);
const { users, loading: loadingUsers } = storeToRefs(userStore);

const activeTab = ref("users");
const content = ref("");
const sortOrder = ref("latest");
const searchKey = ref("");
const isUserTab = computed(() => activeTab.value === "users");
const isTweetTab = computed(() => activeTab.value === "tweets");
const isUsersPresent = computed(
  () => users.value.length > 0 && isUserTab.value
);
const isTweetsPresent = computed(
  () => tweets.value.length > 0 && isTweetTab.value
);
const isUsersEmpty = computed(
  () => users.value.length === 0 && isUserTab.value
);
const isTweetsEmpty = computed(
  () => tweets.value.length === 0 && isTweetTab.value
);
const isUsersOrTweetsLoading = computed(
  () => loadingUsers.value || loadingTweets.value
);

const isActiveTab = (tab) => activeTab.value === tab;

const fetchProfileOrTweets = async (params) => {
  let { activeTab, searchKey, sortOrder, isMounted = true } = params;
  searchKey = searchKey.value;
  sortOrder = sortOrder.value;
  activeTab = activeTab.value;
  if (activeTab === "tweets") {
    // if (isMounted) {
    await tweetStore.fetchTweets({ searchKey, sortOrder });
    // } else {
    //   await useAsyncData("fetchTweets", () =>
    //     tweetStore.fetchTweets({ searchKey, sortOrder })
    //   );
    // }
  } else {
    // if (isMounted) {
    await userStore.fetchUsers({ searchKey, sortOrder });
    // } else {
    //   await useAsyncData("fetchUsers", () =>
    //     userStore.fetchUsers({ searchKey, sortOrder })
    //   );
    // }
  }
};

const onSearchKeyChange = (event) => {
  fetchProfileOrTweets({ activeTab, searchKey: event.target, sortOrder });
};

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === "latest" ? "oldest" : "latest";
  fetchProfileOrTweets({ activeTab, searchKey, sortOrder });
};

const searchPlaceholder = computed(() =>
  activeTab.value === "tweets" ? "Search tweets..." : "Search users..."
);

const setActiveTab = (tab) => {
  activeTab.value = tab;
  fetchProfileOrTweets({ activeTab, searchKey, sortOrder });
};

const createTweet = () => {
  tweetStore.createTweet({ content: content.value });
  content.value = "";
  activeTab.value = "tweets";
};

fetchProfileOrTweets({ activeTab, searchKey, sortOrder, isMounted: false });
</script>
