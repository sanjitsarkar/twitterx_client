import useApi from '~/composables/useApi';
import useToken from '~/composables/useToken';


export default {
  async fetchUsers(params) {
    const { searchKey, sortOrder, page } = params || {}

    this.loading = true;
    this.error = null;

    const toast = useNuxtApp().$toast;

    try {
      const { api } = useApi();

      const data = await api('/users', {
        query: {
          searchKey,
          orderBy: sortOrder,
          page
        }
      })

      this.users = data;

    } catch (error) {
      this.error = error.message;
      console.error('Error fetching users:', error)
      toast.error("Error fetching users");
    } finally {
      this.loading = false;
    }
  },
  async fetchProfile() {

    this.loading = true;
    this.error = null;
    const toast = useNuxtApp().$toast;

    try {
      const { api } = useApi();
      const data = await api('/users/profile')

      this.user = data;

    } catch (error) {

      this.error = 'Error fetching profile';
      console.error('Error fetching profile:', error)
      toast.error("Error fetching profile");


    } finally {
      this.loading = false;
    }
  },
  async fetchUserProfile(userId) {

    this.loading = true;
    this.error = null;
    const toast = useNuxtApp().$toast;

    try {
      const { api } = useApi();
      const data = await api(`/users/${userId}`)

      this.userProfile = data;

    } catch (error) {
      this.error = 'Error fetching user profile';
      console.error('Error fetching user profile:', error)
      toast.error("Error fetching user profile");
    } finally {
      this.loading = false;
    }
  },
  async updateProfile(userProfile) {

    this.loading = true;
    this.error = null;
    const toast = useNuxtApp().$toast;

    try {

      const { api } = useApi();
      const data = await api(`/api/profile`, {
        method: 'PUT',
        body: userProfile,
      })

      this.user = data.user;

      toast.info('Profile updated successfully');
    } catch (error) {
      this.error = 'Error updating profile';
      console.error('Error updating profile:', error)
      toast.error("Error updating profile");
    } finally {
      this.loading = false;
    }
  },

  async login(credentials) {

    this.loading = true;
    this.error = null;
    const toast = useNuxtApp().$toast;

    try {
      const router = useNuxtApp().$router;
      const { api } = useApi();

      const data = await api(`/users/login`, {
        method: 'POST',
        body: credentials,
      })

      this.user = data.user;
      this.token = data.token;

      toast.info(`Welcome back, ${data.user.firstName}`);
      const { setToken } = useToken()
      setToken(data.token);
      router.push('/');

    } catch (error) {
      this.error = 'Invalid email or password';
      console.error('Error logging in:', error)

      toast.error("Invalid email or password");

    } finally {
      this.loading = false;
    }
  },

  async register(userDetails) {

    this.loading = true;
    this.error = null;
    const toast = useNuxtApp().$toast;

    try {
      const { api } = useApi();

      await api(`/users/register`, {
        method: 'POST',
        body: userDetails,
      })

      const router = useNuxtApp().$router;
      toast.info(`You have successfully registered, ${userDetails.firstName}, please login`);
      router.push('/login');

    } catch (error) {
      this.error = 'Error registering user';
      console.error('Error registering:', error)
      toast.error("Error registering user");
    } finally {
      this.loading = false;
    }
  },
  logout() {
    this.user = null;
    this.token = null;
    const toast = useNuxtApp().$toast;
    toast.info(`Bye, see you soon 😊`);
    const { setToken } = useToken()
    setToken(null);
    const router = useNuxtApp().$router;
    router.push('/login');
  },
  resetUsers() {
    this.users = [];
  },
  addFollowing(userId) {
    const users = this.users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          isFollower: true,
          followersCount: user.followersCount + 1
        }
      }
      return user;
    });

    this.users = users;
  },
  removeFollowing(userId) {
    const users = this.users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          isFollowing: false,
          followersCount: user.followersCount - 1
        }
      }
      return user;
    });
    this.users = users;
  },
  updateSearchFilter(searchFilter) {
    this.searchFilter = { ...this.searchFilter, ...searchFilter };
  }

}
