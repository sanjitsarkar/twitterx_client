export default {
  async fetchUsers({ commit }, { searchKey, orderBy, page }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const data = await $fetch('http://localhost:8080/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        query: {
          searchKey,
          orderBy,
          page
        }
      })
      commit('SET_USERS', data)
    } catch (error) {
      commit('SET_ERROR', 'Error fetching users')
      console.error('Error fetching users:', error)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async fetchProfile({ commit }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const data = await $fetch('http://localhost:8080/api/users/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      commit('SET_USER', data)
    } catch (error) {
      commit('SET_ERROR', 'Error fetching profile')
      console.error('Error fetching profile:', error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateProfile({ commit }, userProfile) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const data = await $fetch('/api/profile', {
        method: 'PUT',
        body: userProfile,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      commit('SET_USER', data.user)
    } catch (error) {
      commit('SET_ERROR', error.message)
      console.error('Error updating profile:', error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async login({ commit }, credentials) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const data = await $fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        body: credentials,

      })
      commit('SET_USER', data.user)
      commit('SET_TOKEN', data.token)
      localStorage.setItem('token', data.token)
      // You may need to handle setting the token for subsequent requests here
    } catch (error) {
      commit('SET_ERROR', error.message)
      console.error('Error logging in:', error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async register({ commit }, userDetails) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      await $fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        body: userDetails,
      })

    } catch (error) {
      commit('SET_ERROR', error.message)
      console.error('Error registering:', error)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  logout({ commit }) {
    commit('SET_USER', null)
    commit('SET_TOKEN', null)
    localStorage.removeItem('token')
  }
}