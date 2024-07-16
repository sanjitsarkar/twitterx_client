<!-- <template>
  <div>
    <h1>Post {{ postId }}</h1>
  </div>
</template>

<script setup lang="ts">
const router = useRoute();
const postId = router.params.id;

definePageMeta({
  layout: { name: "orange" },
  // pageTransition: false,
  // layoutTransition: false,
  validate: async (route) => {
    return Number.isInteger(Number(route.params.id));
  },
});
</script>

<style lang="scss" scoped></style> -->

<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: "slide-right",
    mode: "out-in",
    onBeforeEnter: (el) => {
      console.log("Before enter...", { el });
    },
    onEnter: (el, done) => {
      console.log({ el, done }, "onEnter");
    },
    onAfterEnter: (el) => {
      console.log({ el }, "onAfterEnter");
    },
  },
  middleware(to, from) {
    console.log({ to, from });
    if (to.meta.pageTransition && typeof to.meta.pageTransition !== "boolean")
      to.meta.pageTransition.name =
        +to.params.id! > +from.params.id! ? "slide-left" : "slide-right";
  },
});
</script>

<template>
  <h1>#{{ $route.params.id }}</h1>
</template>

<style>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translate(50px, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate(50px, 0);
}
</style>
