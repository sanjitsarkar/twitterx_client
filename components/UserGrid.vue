<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
  >
    <UserCard v-for="user in users" :key="user.id" :user="user" />
  </div>
</template>

<script setup>
import UserCard from "@/components/UserCard.vue";
const { users } = defineProps(["users"]);
</script>
