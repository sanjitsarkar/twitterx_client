export default {
  SET_LOADING(state, isLoading) {
    state.loading = isLoading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  ADD_FOLLOWING(state, user) {
    state.following.unshift(user)
  },
  REMOVE_FOLLOWING(state, userId) {
    state.following = state.following.filter(user => user.id !== userId)
  },
  SET_FOLLOWERS(state, followers) {
    state.followers = followers
  },
  SET_FOLLOWING(state, following) {
    state.following = following
  },
  RESET_FOLLOWERS(state) {
    state.followers = [];
  },
  RESET_FOLLOWINGS(state) {
    state.following = [];
  },
}