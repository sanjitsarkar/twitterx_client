<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Sign up to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="registerUser">
        <div>
          <label
            for="firstName"
            class="block text-sm font-medium leading-6 text-gray-900"
            >First Name</label
          >
          <div class="mt-2">
            <input
              id="firstName"
              name="firstName"
              type="text"
              autocomplete="given-name"
              required="true"
              v-model="credentials.firstName"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            for="lastName"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Last Name</label
          >
          <div class="mt-2">
            <input
              id="lastName"
              name="lastName"
              type="text"
              autocomplete="family-name"
              required="true"
              v-model="credentials.lastName"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required="true"
              v-model="credentials.email"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required="true"
              v-model="credentials.password"
              class="block w-full p-2 text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label
              for="confirmPassword"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Confirm Password</label
            >
          </div>
          <div class="mt-2">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autocomplete="current-password"
              required="true"
              v-model="credentials.confirmPassword"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already have an account?
        <NuxtLink
          to="/login"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Login</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();
const credentials = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
});
const user = computed(() => store.state.user.user);
const error = computed(() => store.state.user.error);
watch(error, (errorNew) => {
  if (errorNew) {
  }
});
const registerUser = () => {
  const { firstName, confirmPassword, email, lastName, password } = credentials;
  store.dispatch("user/register", { firstName, lastName, email, password });
};

watch(user, (newUser) => {
  if (newUser) {
    router.push("/login");
  }
});
</script>
