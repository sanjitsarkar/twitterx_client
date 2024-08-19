<template>
  <header class="bg-white shadow-2xl sticky w-screen left-0 right-0 top-0">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <NuxtLink to="/" class="-m-1.5 p-1.5">
          <span>TwitterX</span>
        </NuxtLink>
      </div>

      <div v-if="!userInfo" class="lg:flex lg:flex-1 lg:justify-end">
        <NuxtLink
          href="/login"
          class="text-sm font-semibold leading-6 text-gray-900"
          >Log in <span aria-hidden="true">&rarr;</span></NuxtLink
        >
      </div>
      <div v-else class="flex justify-end gap-2 items-center">
        <NuxtLink :to="`/user/${userInfo?.id}`">
          {{ userInfo?.firstName }} {{ userInfo?.lastName }}
        </NuxtLink>
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
import { useUserStore } from "~/stores/user";
import useToken from "~/composables/useToken";
import { storeToRefs } from "pinia";

const store = useUserStore();
const router = useRouter();
const { user: userInfo } = storeToRefs(store);
const { token } = useToken();

const isAuthenticated = computed(() => !!token);

const logout = () => {
  store.logout();
  router.push("/login");
};

const fetchProfile = async () => {
  if (isAuthenticated.value) {
    await useAsyncData("profile", () => store.fetchProfile());
  } else {
    router.push("/login");
  }
};

fetchProfile();
</script>
