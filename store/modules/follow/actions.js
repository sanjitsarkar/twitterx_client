import Cookies from 'universal-cookie';
import { apiBase } from '~/utils/common.utils';

const cookies = new Cookies();

export default {
  async followUser({ commit }, userId) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const token = cookies.get('token');
      const data = await $fetch(`${apiBase}/follow/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'POST',
      })
      commit('ADD_FOLLOWING', data.user)
      commit('user/UPDATE_USER_FOLLOWER', { userId, isFollower: true }, { root: true })
      useNuxtApp().$toast.info(`You are now following ${data.user.name}`);
    } catch (error) {
      commit('SET_ERROR', 'Error following user')
      console.error('Error following user:', error)
      // useNuxtApp().$toast.error("Error following user");
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async unfollowUser({ commit }, userId) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const token = cookies.get('token');
      await $fetch(`${apiBase}/follow/unfollow/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      commit('REMOVE_FOLLOWING', userId)
      commit('user/UPDATE_USER_FOLLOWER', { userId, isFollower: false }, { root: true })
      useNuxtApp().$toast.info(`You have unfollowed the user`);
    } catch (error) {
      commit('SET_ERROR', 'Error unfollowing user')
      console.error('Error unfollowing user:', error)
      // useNuxtApp().$toast.error("Error unfollowing user");
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async getFollowers({ commit }, params) {
    const { userId, searchKey, sortOrder, page } = params || {}
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const token = cookies.get('token');
      const data = await $fetch(`${apiBase}/follow/followers/${userId}`, {
        query: {
          searchKey,
          orderBy: sortOrder,
          page
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      commit('SET_FOLLOWERS', data)
    } catch (error) {
      commit('SET_ERROR', 'Error getting followers')
      console.error('Error getting followers:', error)
      useNuxtApp().$toast.error("Error getting followers");
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async getFollowings({ commit }, params) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const { userId, searchKey, sortOrder, page } = params || {}
      const token = cookies.get('token');
      const data = await $fetch(`${apiBase}/follow/following/${userId}`, {
        query: {
          searchKey,
          orderBy: sortOrder,
          page
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      commit('SET_FOLLOWING', data)
    } catch (error) {
      commit('SET_ERROR', 'Error getting following')
      console.error('Error getting following:', error)
      useNuxtApp().$toast.error("Error getting following");
    } finally {
      commit('SET_LOADING', false)
    }
  },

  resetFollowers({ commit }) {
    commit('RESET_FOLLOWERS');
  },

  resetFollowings({ commit }) {
    commit('RESET_FOLLOWINGS');
  },
}
