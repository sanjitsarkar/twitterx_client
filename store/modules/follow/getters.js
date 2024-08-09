export default {
  isLoading(state) {
    return state.loading
  },
  getError(state) {
    return state.error
  },
  getFollowers(state) {
    return state.followers
  },
  getFollowing(state) {
    return state.following
  },
}