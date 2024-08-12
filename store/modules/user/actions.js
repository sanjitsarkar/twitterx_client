import Cookies from 'universal-cookie';
import { useRuntimeConfig } from '#app';


const cookies = new Cookies();

export default {
  async fetchUsers({ commit }, params) {
    const { searchKey, orderBy, page } = params || {}
    commit('RESET_USERS');
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)

    try {
      const token = cookies.get('token');
      const config = useRuntimeConfig();
      const apiBase = config.public.apiBase;

      const data = await $fetch(`${apiBase}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
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
      useNuxtApp().$toast.error(error.message);
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async fetchProfile({ commit }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const token = cookies.get('token');
      const config = useRuntimeConfig();
      const apiBase = config.public.apiBase;

      const data = await $fetch(`${apiBase}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      commit('SET_USER', data)
    } catch (error) {
      commit('SET_ERROR', 'Error fetching profile')
      console.error('Error fetching profile:', error)
      useNuxtApp().$toast.error("Error fetching profile");

    } finally {
      commit('SET_LOADING', false)
    }
  },
  async fetchUserProfile({ commit }, userId) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const token = cookies.get('token');
      const config = useRuntimeConfig();
      const apiBase = config.public.apiBase;

      const data = await $fetch(`${apiBase}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      commit('SET_USER_PROFILE', data)
    } catch (error) {
      commit('SET_ERROR', 'Error fetching user profile')
      console.error('Error fetching user profile:', error)
      useNuxtApp().$toast.error("Error fetching user profile");
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async updateProfile({ commit }, userProfile) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const token = cookies.get('token');
      const config = useRuntimeConfig();
      const apiBase = config.public.apiBase;

      const data = await $fetch(`${apiBase}/api/profile`, {
        method: 'PUT',
        body: userProfile,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      commit('SET_USER', data.user)
      useNuxtApp().$toast.info('Profile updated successfully');
    } catch (error) {
      commit('SET_ERROR', error.message)
      console.error('Error updating profile:', error)
      useNuxtApp().$toast.error("Error updating profile");
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async login({ commit }, credentials) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const config = useRuntimeConfig();
      const apiBase = config.public.apiBase;

      const data = await $fetch(`${apiBase}/users/login`, {
        method: 'POST',
        body: credentials,

      })
      commit('SET_USER', data.user)
      commit('SET_TOKEN', data.token)
      useNuxtApp().$toast.info(`Welcome back, ${data.user.firstName}`);
      cookies.set('token', data.token, { path: '/', secure: true, sameSite: 'strict' }); // Store token in cookies
      useNuxtApp().$router.push('/');
    } catch (error) {
      commit('SET_ERROR', error.message)
      console.error('Error logging in:', error)

      useNuxtApp().$toast.error("Invalid email or password");
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async register({ commit }, userDetails) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const config = useRuntimeConfig();
      const apiBase = config.public.apiBase;

      await $fetch(`${apiBase}/users/register`, {
        method: 'POST',
        body: userDetails,
      })
      useNuxtApp().$toast.info(`You have successfully registered, ${userDetails.firstName}, please login`);
      useNuxtApp().$router.push('/login');
    } catch (error) {
      commit('SET_ERROR', error.message)
      console.error('Error registering:', error)
      useNuxtApp().$toast.error("Error registering user");
    } finally {
      commit('SET_LOADING', false)
    }
  },
  logout({ commit }) {
    commit('SET_USER', null)
    commit('SET_TOKEN', null)
    useNuxtApp().$toast.info(`Bye, see you soon 😊`);
    cookies.remove('token', { path: '/' });
    useNuxtApp().$router.push('/login');
  },
  resetUsers({ commit }) {
    commit('RESET_USERS');
  },
}
