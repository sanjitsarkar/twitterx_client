export default {
  SET_TWEETS(state, tweets) {
    state.tweets = tweets
  },
  ADD_TWEET(state, tweet) {
    state.tweets.unshift(tweet)
  },
  UPDATE_TWEET(state, updatedTweet) {
    const index = state.tweets.findIndex(tweet => tweet.id === updatedTweet.id)
    if (index !== -1) {
      state.tweets.splice(index, 1, updatedTweet)
    }
  },
  DELETE_TWEET(state, tweetId) {
    state.tweets = state.tweets.filter(tweet => tweet.id !== tweetId)
  },
  SET_LOADING(state, isLoading) {
    state.loading = isLoading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  RESET_TWEETS(state) {
    state.tweets = [];
  },
}