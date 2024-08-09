<template>
  <header class="bg-white shadow-2xl sticky w-screen left-0 right-0 top-0">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <NuxtLink href="/" class="-m-1.5 p-1.5">
          <span>TwitterX</span>
        </NuxtLink>
      </div>

      <div v-if="!isAuthenticated" class="lg:flex lg:flex-1 lg:justify-end">
        <span> {{ userInfo?.firstName }} {{ userInfo?.lastName }} </span>
        <NuxtLink
          href="/login"
          class="text-sm font-semibold leading-6 text-gray-900"
          >Log in <span aria-hidden="true">&rarr;</span></NuxtLink
        >
      </div>
      <div v-else class="lg:flex lg:flex-1 lg:justify-end">
        <button
          @click="logout"
          class="text-sm font-semibold leading-6 text-gray-900"
        >
          Log out <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const isAuthenticated = computed(() => store.getters["user/isAuthenticated"]);
const userInfo = computed(() => store.state.user.user);
watch(isAuthenticated, (value) => {
  if (!value) {
    router.push("/login");
  }
});
const logout = () => {
  store.dispatch("user/logout");
};

onMounted(() => {
  if (isAuthenticated.value) {
    store.dispatch("user/fetchProfile");
  }
});
</script>
