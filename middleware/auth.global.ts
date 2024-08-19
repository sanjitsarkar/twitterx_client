import useToken from "~/composables/useToken"

export default defineNuxtRouteMiddleware((to, from) => {
  const { token } = useToken()
  const isAuthenticated = !!token
  if (!isAuthenticated && to.path !== "/login" && to.path !== "/register") {
    return navigateTo("/login")
  }
})
