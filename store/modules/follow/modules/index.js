
export const state = () => ({
  tweets: [],
  loading: false,
  error: null,
})

export const mutations = {
  SET_TWEETS(state, tweets) {
    state.tweets = tweets
  },
  ADD_TWEET(state, tweet) {
    state.tweets.push(tweet)
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
}

export const actions = {
  async fetchTweets({ commit }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const data = await $fetch('/api/tweets')
      commit('SET_TWEETS', data)
    } catch (error) {
      commit('SET_ERROR', 'Error fetching tweets')
      console.error('Error fetching tweets:', error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createTweet({ commit }, tweet) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const data = await $fetch('/api/tweets', {
        method: 'POST',
        body: tweet,
      })
      commit('ADD_TWEET', data)
    } catch (error) {
      commit('SET_ERROR', 'Error creating tweet')
      console.error('Error creating tweet:', error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateTweet({ commit }, tweet) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const data = await $fetch(`/api/tweets/${tweet.id}`, {
        method: 'PUT',
        body: tweet,
      })
      commit('UPDATE_TWEET', data)
    } catch (error) {
      commit('SET_ERROR', 'Error updating tweet')
      console.error('Error updating tweet:', error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async deleteTweet({ commit }, tweetId) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      await $fetch(`/api/tweets/${tweetId}`, {
        method: 'DELETE',
      })
      commit('DELETE_TWEET', tweetId)
    } catch (error) {
      commit('SET_ERROR', 'Error deleting tweet')
      console.error('Error deleting tweet:', error)
    } finally {
      commit('SET_LOADING', false)
    }
  },
}

export const getters = {
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
