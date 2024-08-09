export default {
  SET_LOADING(state, isLoading) {
    state.loading = isLoading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_FOLLOWERS(state, followers) {
    state.followers = followers
  },
  SET_FOLLOWING(state, following) {
    state.following = following
  },
  ADD_FOLLOWING(state, user) {
    state.following.push(user)
  },
  REMOVE_FOLLOWING(state, userId) {
    state.following = state.following.filter(user => user.id !== userId)
  },
}