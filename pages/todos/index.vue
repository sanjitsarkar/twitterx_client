<template>
  <div>
    <h1>{{ count }}</h1>
    <button @click="count++">Increment</button>
    <button @click="count--">Decrement</button>
    <button @click="execute">Fetch Todos</button>
    <button @click="refresh">Refresh Todos</button>
    <input type="text" v-model="id" :disabled="pending" />
    <h1>Todos:{{ status }}</h1>
    <h1 v-if="pending">Loading Todos</h1>
    <h1 v-if="error">{{ error.message }}</h1>
    <ul v-else-if="status === 'success' && data?.length > 0">
      <li v-for="todo in data" :key="todo.id">{{ todo }}</li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({});
// const {
//   error,
//   status,
//   data: todos,
// } = await useFetch("https://dummyjson.com/todos", {
//   pick: ["todos"],
//   lazy: true,
//   server: false,
// });
// const { id } = useRoute().params;
const id = ref(1);
const count = useCounter();
const { error, status, data, execute, refresh } = await useAsyncData(
  "todos",
  async () => {
    const response = await $fetch(
      `https://dummyjson.com/todos/${id.value}`,
      {}
    );
    if (!response) {
      throw createError({
        statusCode: 404,
        statusMessage: "Page Not Found",
      });
    }
    console.log({ response });
    return response;
  },
  {
    watch: [id],
    // transform: (data) => {
    //   console.log({ data });
    //   const response = data.todos.map((each) => ({
    //     title: each.todo,
    //     id: each.id,
    //   }));
    //   console.log({ xxx: response });
    //   return response;
    // },
    // pick: ["todos"],
    lazy: true,
    immediate: false,
    server: false,
  }
);
const pending = computed(() => status.value === "pending");
</script>

<style lang="scss" scoped></style>
