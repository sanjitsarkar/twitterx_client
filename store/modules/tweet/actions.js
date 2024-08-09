export default {
  async fetchTweets({ commit }, { searchKey, orderBy, page }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const data = await $fetch('http://localhost:8080/api/tweets', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        query: {
          searchKey,
          orderBy,
          page
        }
      })
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
      const data = await $fetch('http://localhost:8080/api/tweets', {
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
      const data = await $fetch(`http://localhost:8080/api/tweets/${tweet.id}`, {
        method: 'PATCH',
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
      await $fetch(`http://localhost:8080/api/tweets/${tweetId}`, {
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

  async fetchUserTweets({ commit }, userId) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const data = await $fetch(`http://localhost:8080/api/users/${userId}/tweets`)
      commit('SET_TWEETS', data)
    } catch (error) {
      commit('SET_ERROR', 'Error fetching user tweets')
      console.error('Error fetching user tweets:', error)
    } finally {
      commit('SET_LOADING', false)
    }
  }
}