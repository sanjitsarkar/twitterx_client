export default {
  isAuthenticated(state) {
    return !!state.token || !!localStorage.getItem('token')
  },
  getUser(state) {
    return state.user
  },
  isLoading(state) {
    return state.loading
  },
  getError(state) {
    return state.error
  },
}