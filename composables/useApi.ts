import { useRuntimeConfig } from '#app';
import useToken from '~/composables/useToken';

export default function useApi() {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;
  const { token } = useToken();

  const api = async (url: string, options: any = {}) => {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    return await $fetch(`${apiBase}${url}`, options);
  };

  return { api };
}
