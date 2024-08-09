export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = !!localStorage.getItem("token");
  if (!isAuthenticated) {
    return navigateTo("/login")
  }
})