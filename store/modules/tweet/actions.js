import Cookies from 'universal-cookie';
import { useRuntimeConfig } from '#app';


const cookies = new Cookies();

export default {
  async fetchTweets({ commit }, params) {
    const { searchKey, orderBy, page } = params || {}
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const token = cookies.get('token');
      const config = useRuntimeConfig();
      const apiBase = config.public.apiBase;

      const data = await $fetch(`${apiBase}/tweets`, {
        headers: {
          Authorization: `Bearer ${token}`
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
      useNuxtApp().$toast.error("Error fetching tweets");
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createTweet({ commit }, tweet) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const token = cookies.get('token');
      const config = useRuntimeConfig();
      const apiBase = config.public.apiBase;

      const data = await $fetch(`${apiBase}/tweets`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: tweet,
      })
      commit('ADD_TWEET', data)
      useNuxtApp().$toast.success('Tweet created successfully');
    } catch (error) {
      commit('SET_ERROR', 'Error creating tweet')
      console.error('Error creating tweet:', error)
      useNuxtApp().$toast.error("Error creating tweet");
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateTweet({ commit }, tweet) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const token = cookies.get('token');
      const config = useRuntimeConfig();
      const apiBase = config.public.apiBase;

      const data = await $fetch(`${apiBase}/tweets/${tweet.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: tweet,
      })
      commit('UPDATE_TWEET', data)
      useNuxtApp().$toast.success('Tweet updated successfully');
    } catch (error) {
      commit('SET_ERROR', 'Error updating tweet')
      console.error('Error updating tweet:', error)
      useNuxtApp().$toast.error("Error updating tweet");
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async deleteTweet({ commit }, tweetId) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const token = cookies.get('token');
      const config = useRuntimeConfig();
      const apiBase = config.public.apiBase;

      await $fetch(`${apiBase}/tweets/${tweetId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      commit('DELETE_TWEET', tweetId)
      useNuxtApp().$toast.info('Tweet deleted successfully');
    } catch (error) {
      commit('SET_ERROR', 'Error deleting tweet')
      console.error('Error deleting tweet:', error)
      useNuxtApp().$toast.error("Error deleting tweet");
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchUserTweets({ commit }, userId) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const token = cookies.get('token');
      const config = useRuntimeConfig();
      const apiBase = config.public.apiBase;

      const data = await $fetch(`${apiBase}/users/${userId}/tweets`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      commit('SET_TWEETS', data)
    } catch (error) {
      commit('SET_ERROR', 'Error fetching user tweets')
      console.error('Error fetching user tweets:', error)
      useNuxtApp().$toast.error("Error fetching user tweets");
    } finally {
      commit('SET_LOADING', false)
    }
  },

  resetTweets({ commit }) {
    commit('RESET_TWEETS');
  },
}
