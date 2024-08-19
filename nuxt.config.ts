export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8080/api'
    }
  },
  routeRules: {
    '/login': { ssr: false },
    '/': { ssr: false },
  },
  compatibilityDate: '2024-08-12'
});