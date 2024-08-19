import useApi from '~/composables/useApi';


export default {
  async fetchTweets(params) {
    const { searchKey, sortOrder, page } = params || {};
    this.loading = true;
    this.error = null;
    const toast = useNuxtApp().$toast;

    try {
      const { api } = useApi();
      const data = await api('/tweets', {
        query: { searchKey, orderBy: sortOrder, page },
      });
      this.tweets = data;
    } catch (error) {
      this.error = 'Error fetching tweets';
      console.error('Error fetching tweets:', error);
      toast.error("Error fetching tweets");
    } finally {
      this.loading = false;
    }
  },

  async createTweet(tweet) {
    this.loading = true;
    this.error = null;
    const toast = useNuxtApp().$toast;


    try {
      const { api } = useApi();
      const data = await api('/tweets', {
        method: 'POST',
        body: tweet,
      });

      this.tweets.unshift(data);
      toast.success('Tweet created successfully');
    } catch (error) {
      this.error = 'Error creating tweet';
      console.error('Error creating tweet:', error);
      toast.error("Error creating tweet");
    } finally {
      this.loading = false;
    }
  },

  async updateTweet(tweet) {
    this.loading = true;
    this.error = null;
    const toast = useNuxtApp().$toast;

    try {
      const { api } = useApi();
      const data = await api(`/tweets/${tweet.id}`, {
        method: 'PATCH',
        body: tweet,
      });

      const index = this.tweets.findIndex((t) => t.id === tweet.id);
      if (index !== -1) {
        this.tweets.splice(index, 1, data);
      }
      toast.success('Tweet updated successfully');
    } catch (error) {
      this.error = 'Error updating tweet';
      console.error('Error updating tweet:', error);
      toast.error("Error updating tweet");
    } finally {
      this.loading = false;
    }
  },

  async deleteTweet(tweetId) {
    this.loading = true;
    this.error = null;
    const toast = useNuxtApp().$toast;

    try {
      const { api } = useApi();
      await api(`/tweets/${tweetId}`, {
        method: 'DELETE',
      });

      this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);
      toast.info('Tweet deleted successfully');
    } catch (error) {
      this.error = 'Error deleting tweet';
      console.error('Error deleting tweet:', error);
      toast.error("Error deleting tweet");
    } finally {
      this.loading = false;
    }
  },

  async fetchUserTweets(params) {
    const { userId, searchKey, sortOrder, page } = params || {};
    this.loading = true;
    this.error = null;
    const toast = useNuxtApp().$toast;

    try {
      const { api } = useApi();
      const data = await api(`/users/${userId}/tweets`, {
        query: { searchKey, orderBy: sortOrder, page },
      });

      this.tweets = data;
    } catch (error) {
      this.error = 'Error fetching user tweets';
      console.error('Error fetching user tweets:', error);
      toast.error("Error fetching user tweets");
    } finally {
      this.loading = false;
    }
  },

  resetTweets() {
    this.tweets = [];
  },
  updateSearchFilter(searchFilter) {
    this.searchFilter = { ...this.searchFilter, ...searchFilter };
  }
}