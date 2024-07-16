<!-- <template>
  <div>
    <h1>Welcome to the homepage</h1>
    <AppAlert> This is an auto-imported component </AppAlert>
  </div>
</template>
<script>
import "animate.css";
// import "~/assets/css/first.css";
// import("~/assets/css/first.css"); //Dynamic import is not Server-Side compatible
</script>
<style>
/**
@import url("~/assets/css/first.css");**/
</style> -->

<template>
  <header>
    <AppAlert> Hollla </AppAlert>
    <nav>
      <ul>
        <li>
          <NuxtLink to="/about">About</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/posts/1">Post 1</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/posts/2">Post 2</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/dashboard">Dashboard</NuxtLink>
        </li>
        <li v-show="true">
          <NuxtLink to="/login">Login</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
