export default {
  getAllTweets(state) {
    return state.tweets
  },
  isLoading(state) {
    return state.loading
  },
  getError(state) {
    return state.error
  },
}