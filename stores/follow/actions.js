import useApi from '~/composables/useApi';
import { useUserStore } from '../user';


export default {

  async followUser(userId) {
    this.loading = true;
    this.error = null;

    const toast = useNuxtApp().$toast;

    try {
      const { api } = useApi();
      const data = await api(`/follow/${userId}`, {
        method: 'POST',
      });

      this.addFollowing(data);
      this.updateUserFollower({ userId, isFollower: true });
      toast.info(`You are now following the user`);
    } catch (error) {
      this.error = 'Error following user';
      console.error('Error following user:', error);
      toast.error("Error following user");
    } finally {
      this.loading = false;
    }
  },

  async unfollowUser(userId) {
    this.loading = true;
    this.error = null;

    const toast = useNuxtApp().$toast;

    try {
      const { api } = useApi();
      await api(`/follow/unfollow/${userId}`, {
        method: 'DELETE',
      });

      this.removeFollowing(userId);
      this.updateUserFollower({ userId, isFollower: false });
      toast.info(`You have unfollowed the user`);
    } catch (error) {
      this.error = 'Error unfollowing user';
      console.error('Error unfollowing user:', error);
      toast.error("Error unfollowing user");
    } finally {
      this.loading = false;
    }
  },

  async getFollowers(params) {
    const { userId, searchKey, sortOrder, page } = params || {};
    this.loading = true;
    this.error = null;

    const toast = useNuxtApp().$toast;

    try {
      const { api } = useApi();
      const data = await api(`/follow/followers/${userId}`, {
        query: {
          searchKey,
          orderBy: sortOrder,
          page
        }
      });

      this.setFollowers(data);
    } catch (error) {
      this.error = 'Error getting followers';
      console.error('Error getting followers:', error);
      toast.error("Error getting followers");
    } finally {
      this.loading = false;
    }
  },

  async getFollowings(params) {
    const { userId, searchKey, sortOrder, page } = params || {};
    this.loading = true;
    this.error = null;

    const toast = useNuxtApp().$toast;

    try {
      const { api } = useApi();
      const data = await api(`/follow/following/${userId}`, {
        query: {
          searchKey,
          orderBy: sortOrder,
          page
        }
      });

      this.setFollowing(data);
    } catch (error) {
      this.error = 'Error getting following';
      console.error('Error getting following:', error);
      toast.error("Error getting following");
    } finally {
      this.loading = false;
    }
  },

  resetFollowers() {
    this.resetFollowersState();
  },

  resetFollowings() {
    this.resetFollowingsState();
  },

  updateUserFollower({ userId, isFollower }) {
    const userIndex = this.followers.findIndex(follower => follower.id === userId);
    if (userIndex !== -1) {
      this.followers[userIndex].isFollower = isFollower;
    }
  },
  setLoading(isLoading) {
    this.loading = isLoading;
  },
  setError(error) {
    this.error = error;
  },
  addFollowing(user) {
    this.following.unshift(user);
    const userStore = useUserStore();
    userStore.addFollowing(user.following_id);
  },
  removeFollowing(userId) {
    this.following = this.following.filter(user => user.id !== userId);
    const userStore = useUserStore();
    userStore.removeFollowing(userId);
  },
  setFollowers(followers) {
    this.followers = followers;
  },
  setFollowing(following) {
    this.following = following;
  },
  resetFollowersState() {
    this.followers = [];
  },
  resetFollowingsState() {
    this.following = [];
  },
  updateSearchFilter(searchFilter) {
    this.searchFilter = { ...this.searchFilter, ...searchFilter };
  }
};