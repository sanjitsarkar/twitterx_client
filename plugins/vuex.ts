// plugins/vuex.js
import store from '@/store'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store)
  return {
    provide: {
      store,
    },
  }
})
