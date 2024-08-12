import { isAuthenticated } from "~/utils/common.utils";

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    if (!isAuthenticated) {
      return navigateTo("/login")
    }
  }
})