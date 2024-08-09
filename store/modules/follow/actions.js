export default {
  async followUser({ commit }, userId) {

    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const data = await $fetch(`http://localhost:8080/api/follow/${userId}`, {
        method: 'POST',
      })
      commit('ADD_FOLLOWING', data.user)
    } catch (error) {
      commit('SET_ERROR', 'Error following user')
      console.error('Error following user:', error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async unfollowUser({ commit }, userId) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      await $fetch(`http://localhost:8080/api/follow/unfollow/${userId}`, {
        method: 'DELETE',
      })
      commit('REMOVE_FOLLOWING', userId)
    } catch (error) {
      commit('SET_ERROR', 'Error unfollowing user')
      console.error('Error unfollowing user:', error)
    } finally {
      commit('SET_LOADING', false)
    }
  },
}