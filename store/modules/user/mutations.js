export default {
  SET_USER(state, user) {
    state.user = user
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_LOADING(state, isLoading) {
    state.loading = isLoading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_USERS(state, users) {
    state.users = users
  },

  UPDATE_USER_FOLLOWER(state, { userId, isFollower }) {
    const user = state.users.find(user => user.id === userId)
    if (user) {
      user["isFollower"] = isFollower,
        user["followingCount"] = isFollower ? user["followingCount"] + 1 : user["followingCount"] - 1
    }
  },
  SET_USER_PROFILE(state, userProfile) {
    state.userProfile = userProfile
  },
  RESET_USERS(state) {
    state.users = [];
  },
}

